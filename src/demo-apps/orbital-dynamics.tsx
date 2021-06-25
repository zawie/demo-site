import React, { useEffect } from 'react';
import {Button} from 'antd';
import {StepForwardOutlined,ForwardOutlined,PauseOutlined,FastBackwardOutlined} from '@ant-design/icons'; 
import {Vector2} from 'mafs/typings/math'
import { DemoAppProps } from '../models/definitions'

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
    CartesianCoordinates,
    UseMovablePoint
  } from "mafs"

const clockButtonStyle = {display:"flex",justifyContent:"center",alignContent:"center"}
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

interface IState {
  loading: boolean,
  time: number,
  playing: boolean,
  planets: planet[]
}

export default class TwoBodyGravity extends React.Component<DemoAppProps,IState> {
  private height: number;
  static deltaT = 1/10000;
  interval;

  pos0:Vector2 = [0,0]; 
  vel0:Vector2= [0,0];
  pos1:Vector2 = [2,0]; 
  vel1:Vector2= [0,-200];
  pos2:Vector2 = [0,4]; 
  vel2:Vector2= [100,0];

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
    return vec.scale(p.velocity,-0.5*(p.mass-q.mass)/(p.mass+q.mass))
  }
  
  resetBodies(){
    this.state.planets.forEach(p=>{
      p.force = [0,0]
      p.velocity = [0,0]
    })
  }
  constructor(props){
      super(props)
      this.state = {loading:true, playing:false, time:0, planets:planets}
      this.height = props.height
      //Planet 0
      let planet0:planet = {
        position: this.pos0, //Initial Position
        velocity: this.vel0, //Initial Velocity
        force: null,
        mass: 333000,
        radius: 0.7,
        color:'yellow',
      }
      //Planet1
      var planet1:planet = {
        position: this.pos1, //Initial Position
        velocity: this.vel1, //Initial Velocity
        force: null,
        mass: 1,
        radius: 0.3,
        color:'green',
      }
      //Planet2
      let pos2:Vector2 = [0,0]; 
      let vel2:Vector2= [0,0];
      var planet2:planet = {
        position: this.pos2, //Initial Position
        velocity: this.vel2, //Initial Velocity
        force: null,
        mass: 0.9,
        radius: 0.25,
        color:'gray',
      }
      //Compute initial force
      var planets: planet[] = [planet0,planet1,planet2]
      planet0.force = this.netForce(planet0,planets);
      planet1.force = this.netForce(planet1,planets);
      planet2.force = this.netForce(planet2,planets);
      this.state = {loading:true, playing:false, time:0, planets:planets}
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
        const q = null //this.getCollision(p,futurePos,planets);
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
    if (this.state.playing){
      //Update time and planets
      this.setState(s => ({
        time: s.time + 1/1000,
        planets: this.computePhysics(s.planets)
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Clock calls
  start(){
    this.setState(s => ({playing:true}))
  }
  step(){
    this.start()
    setTimeout(()=>this.pause(),10)
  }
  restart(){
    this.pause()
    this.resetBodies()
  }
  pause(){
    this.setState(s => ({playing:false}))
  }

  render(){
    const span = 5;
    //if (this.state.loading === false) return (<p> loading </p>)
    const planets: planet[] = this.state.planets
    return (
        <>
        {/* Mafs */}
        <Mafs
            xAxisExtent={[-span, span]}
            yAxisExtent={[-span, span]}
            height={this.height-200}
        >
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
                        color = {'white'}
                        opacity = {0.5}
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
        <div style={{display:'flex', margin:10}}>
            <Button onClick={()=>this.restart()} style={clockButtonStyle} type={"text"} danger={true}><FastBackwardOutlined/></Button>
            <Button onClick={()=>this.pause()} style={clockButtonStyle} type={"text"}><PauseOutlined/></Button>
            <Button onClick={()=>this.step()} style={clockButtonStyle} type={"text"}><StepForwardOutlined/></Button>
            <Button onClick={()=>this.start()} style={clockButtonStyle} type={"link"}><ForwardOutlined/></Button>
        </div>
        </>
    )
  }
}
