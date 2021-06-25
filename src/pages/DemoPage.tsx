import React, { FunctionComponent } from 'react';
import { Card, Button, Divider, Descriptions} from 'antd';
import {CloseOutlined, FullscreenExitOutlined, FullscreenOutlined} from '@ant-design/icons'; 
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useWindowDimensions from "../util/useWindowDimensions";
import {Demo, DemoAppProps} from '../models/definitions'
import { Result } from 'antd'
import "mafs/index.css";
import { getDemoComponent } from '../models/demos';

export default function DemoPage(demo: Demo) {
  //Get demo key and demo information
  const DemoToRender: FunctionComponent<DemoAppProps> | null= getDemoComponent(demo)
  const handle = useFullScreenHandle();
  const { height, width } = useWindowDimensions();
  return (
    <div className="Main" style={{margin:20}}>
        {/* Demo card */}
        <Card 
          title={demo['title']} 
          extra={<Button onClick={handle.enter} shape="circle" type="primary"><div style={{display:"flex", justifyContent:"center"}}>
              <FullscreenOutlined style={{fontSize:20}}/>
            </div></Button>}
        >
          <FullScreen handle={handle}>
              {DemoToRender !== null ? <DemoToRender height={Math.min(height,width)} />
                                     : <Result status="warning" title="This application was not found." /> }
          </FullScreen>
        </Card>

        <br></br>

        {/* Description Card */}
        <Card title={"Description"}>
          <p>{demo.description ?? "No description."}</p>
          <p><b>Instructions: </b>{demo.help ?? "No instructions."}</p>
        </Card>
    </div>
  );
}
