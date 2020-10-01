import React, { useEffect } from 'react';
import {
  Mafs,
  VectorField,
  CartesianCoordinates,
  useMovablePoint,
  Vector,
  Text,
} from "mafs"
import { concat } from 'async';
const vec = require('vec-la');

function round(x){
  return Math.trunc(x*100)/100
}

export default function ChargeField({height}) {
  const protons = [
    useMovablePoint([1.501, 1.501], {color:'yellow'}),
    useMovablePoint([-1.499, -1.499], {color:'yellow'})
  ]
  const electrons = [
    useMovablePoint([1.498, -1.5], {color:'red'}),
    useMovablePoint([-1.5, 1.501], {color:'red'})
  ]

  function chargeAtPoint(point){
    var vector = [0,0];
    protons.concat(electrons).forEach(p => {
        const q = p.element.props.color =='red' ? 1 : -1;
        const pos = [p.x,p.y]
        const r = vec.dist(pos,point)
        const direction = vec.norm(vec.sub(pos,point))
        const sub = vec.scale(direction,q/(r**2))
        vector = vec.add(vector,sub)
    })
    return vector
  }

  const a = useMovablePoint([0, 0], {color:'orange'})
  return (
    <Mafs height={height}>
      {/* <CartesianCoordinates subdivisions={2} /> */}
      <VectorField
        xy={(x, y) => {
          const maxMag = 0.25
          var v = vec.scale(chargeAtPoint([x,y]),0.5)
          if (vec.mag(v)>maxMag){
            v = vec.scale(vec.norm(v),maxMag)
          }
          return v
        }

        }
        opacity={(x,y) =>{
          var v = chargeAtPoint([x,y])
          var c = vec.mag(v);
          return Math.max(Math.min(c,1),0)
        }}
        opacityStep = {0.2}
        step={0.5}
      />
      <Vector
        color = 'orange'
        tail = {[a.x,a.y]}
        tip ={vec.add([a.x,a.y],chargeAtPoint([a.x,a.y]))}
      /> 
      <Text
        color ='orange'
        x={a.x}
        y={a.y}
        attach="w"
        attachDistance={30}
      >
        ({round(chargeAtPoint([a.x,a.y])[0])}, {round(chargeAtPoint([a.y,a.y])[1])})
      </Text>

      {a.element}
      {protons[0].element}
      {protons[1].element}
      {electrons[0].element}
      {electrons[1].element}
    </Mafs>
  )
}