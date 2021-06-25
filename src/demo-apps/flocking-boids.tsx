import React, { useEffect } from 'react';
import { isJsxFragment } from 'typescript';
import { DemoAppProps } from '../models/definitions'

export default function Boids(props: DemoAppProps) {
  return (
    <div style={{overflow: "hidden"}}>
    <iframe src='https://flock.zawie.io' style={{height: props.height, width: "100%", marginTop: "-70px"}}/>
    </div>
  )
}  