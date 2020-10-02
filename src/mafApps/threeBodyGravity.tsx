import React, { useEffect } from 'react';
import {Button} from 'antd';
import clamp from "lodash.clamp"
import {
    Mafs,
    useStopwatch,
    Point,
    useMovablePoint,
    FunctionGraph,
    Vector,
    Polygon,
    Text,
    Circle,
    CartesianCoordinates
  } from "mafs"

const vec = require('vec-la');

function round(x){
  return Math.trunc(x*1000)/1000
}
type vector = [number, number]

interface planet {
    position: vector
    velocity: vector
    force: vector
    mass: number
    radius: number
    color: string
}

interface IProps {
  height: number
}

interface IState {
  loading: boolean,
  time: number,
  planets: planet[]
}

export default class TwoBodyGravity extends React.Component<IProps,IState> {
  private height: number;
  static deltaT = 1/10000;
  interval;

  netForce(p:planet,planets:planet[]): vector {
      function f(a:planet,b:planet): vector {
          const G = 0.1
          const r = vec.sub(b.position,a.position)
          if (vec.mag(r) > 0) return vec.scale(r,G*a.mass*b.mass/vec.mag(r)**2)
          return [0,0]
      }
      var force:vector = [0,0];
      planets.forEach(q=> force = vec.add(force, f(p,q)))
      return force
  }

  getCollision(planet:planet, proposedPosition:vector, planets:planet[] ):planet {
    for(let p of planets){
        if(p != planet){
            if(vec.mag(vec.sub(p.position,proposedPosition)) < p.radius + planet.radius){
                return p 
            }
        }
    }
    return null
  }

  deltaVelocity(p:planet):vector {
    return vec.scale(vec.scale(p.force,1/p.mass), TwoBodyGravity.deltaT)
  }
  
  deltaPosition(p:planet):vector {
    return vec.scale(p.velocity, TwoBodyGravity.deltaT);
  }

  deltaVelocityCollision(p:planet, q:planet): vector {
    return vec.scale(p.velocity,0.5*(p.mass-q.mass)/(p.mass+q.mass))
  }
  constructor(props){
      super(props)
      this.height = props.height
      var planet0:planet = {
        position: [0,0], //Initial Position
        velocity: [0,0], //Initial Velocity
        force: null,
        mass: 333000,
        radius: 0.7,
        color:'yellow'
      }
      var planet1:planet = {
        position: [3,0], //Initial Position
        velocity: [0,200], //Initial Velocity
        force: null,
        mass: 1,
        radius: 0.3,
        color:'green'
      }
      var planet2:planet = {
        position: [1.1,0.5], //Initial Position
        velocity: [0,-300], //Initial Velocity
        force: null,
        mass: 0.9,
        radius: 0.25,
        color:'gray'
      }
      //Compute initial force
      var planets: planet[] = [planet0,planet1,planet2]
      planet0.force = this.netForce(planet0,planets);
      planet1.force = this.netForce(planet1,planets);
      planet2.force = this.netForce(planet2,planets);
      this.state = {loading:false, time:0, planets:planets}
      console.log(this.state)
  }

  computePhysics(planets){
    //Calculate forces and store deltas
    let deltaV = new Map()
    let deltaP = new Map()
    planets.forEach(p=>{
        //Update force
        p.force = this.netForce(p,planets)
        //Calculate delta
        const dP:vector = this.deltaPosition(p)
        const futurePos:vector = vec.add(p.position,dP)
        const q = this.getCollision(p,futurePos,planets);
        if (q==null){
            //Normal movement
            deltaP.set(p,dP)
            deltaV.set(p,this.deltaVelocity(p))
        } else {
            //Handle collision
            deltaP.set(p,vec.scale(dP,-1))
            deltaV.set(p,this.deltaVelocityCollision(p,q))
        }

    })
    //Update velocity and positions
    planets.forEach(p=> {
        p.position = vec.add(p.position,deltaP.get(p))
        p.velocity = vec.add(p.velocity,deltaV.get(p))
    })
    return planets
  }

  tick() {
    //Update time and planets
    this.setState(s => ({
      time: s.time + 1/1000,
      planets: this.computePhysics(s.planets)
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    const span = 5;
    console.log(this.state.loading, "AHHHH")
    if (this.state.loading === false) return (<p> loading </p>)
    const planets: planet[] = this.state.planets
    return (
        <>
        {/* Mafs */}
        <Mafs
            xAxisExtent={[-span, span]}
            yAxisExtent={[-span, span]}
            height={this.height-200}
        >
            <CartesianCoordinates />
            {planets.map((planet,i)=>{
                var currentKey = i*100
                function k(){
                    currentKey--;
                    return currentKey
                }
                return(<>
                    {/* The planet body */}
                    <Circle
                        key = {k()}
                        center={planet.position}
                        radius={planet.radius}
                        color = {planet.color}
                    />
                    {/* The velocity vector */}
                    {/* <Vector
                        key = {k()}
                        color = {planet.color}
                        tail = {planet.position}
                        tip = {vec.add(planet.position,vec.scale(planet.velocity,1/100))}
                    /> */}
                    {/* The force vector */}
                    <Vector
                        key = {k()}
                        color = {i == 1 ? 'red' : 'blue'}
                        tail = {planet.position}
                        tip = {vec.add(planet.position,vec.scale(planet.force,1/10000))}
                    />
                </>);
            })}
            {/* <Text x={-1} y={-1}>
                {this.state.time}
            </Text> */}
        </Mafs>


        {/* Stop watch buttons */}
        <div className="p-4 bg-black border-t border-gray-900 space-x-4">
            <Button
            className="bg-gray-200 font-bold px-4 py-1 rounded-sm"
            >
            Start
            </Button>
            <Button
            className="bg-gray-200 font-bold px-4 py-1 rounded-sm"
            >
            Reset
            </Button>
        </div>
        </>
    )
  }
}
