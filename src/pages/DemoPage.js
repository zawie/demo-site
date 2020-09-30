import React from 'react';
import { Card, Button, Divider, Descriptions} from 'antd';
import {CloseOutlined, FullscreenExitOutlined, FullscreenOutlined} from '@ant-design/icons'; 
import Components from "../mafApps/DemoIndex";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useWindowDimensions from "../util/useWindowDimensions";

const demos = require('../demos.json')

export default function DemoPage({match}) {
  //Get demo key and demo information
  const { params: { key } } = match;
  const demo = demos[key]
  const DemoToRender = Components[key];
  const handle = useFullScreenHandle();
  const { height, width } = useWindowDimensions();
  return (
    <div>
        <div className="Main" style={{margin:20}}>
    
            <Card 
              title={demo['title']} 
              extra={<Button onClick={handle.enter} shape="circle" type="primary"><div style={{display:"flex", justifyContent:"center"}}>
                  <FullscreenOutlined style={{fontSize:20}}/>
                </div></Button>}
              style={{height:'100vh', minHeight:'100vh'}}
            >
              <FullScreen handle={handle}>
                  <DemoToRender height={Math.min(height,width)}></DemoToRender>
              </FullScreen>
            </Card>
            <br></br>
            <Card title={"Description"}>
              <p>{demo['description']}</p>
              <p><b>Instructions: </b>{demo['help']}</p>
            </Card>
        </div>
      </div>
  );
}
