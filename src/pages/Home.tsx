import React from 'react';
import { Card, Divider, Button} from 'antd';
import {useHistory} from 'react-router-dom';
import {PlayCircleOutlined} from '@ant-design/icons'; 
const defaultImage = require(`../thumbnails/default.png`);

const { Meta } = Card;
import {DEMOS, getDemoIdentifer, getThumbnail } from '../models/demos'
import { Demo } from '../models/definitions';

const i = 0
export default function Home() {
  const histroy = useHistory();
  return (
    <div className="Main" style={{margin:"20px"}}>
      <Divider orientation="left">About</Divider> 
      <p>
        This site was developed by <a href="https://zawie.io">Adam Zawierucha</a> as a side project. The goal of this project is to create and host a variety of physics
        demonstrations and simulations for educational purposes. If you are an educator or student and have any suggestions for new demonstrations or notice any errors,
        contact the developer at <a href="mailto:zawie@rice.edu">zawie@rice.edu</a>.
      </p>
      <p>
        Have fun! :)
      </p>
      <Divider orientation="left">Demos</Divider> 
      <div style = {{display:'flex',justifyContent:'center', flexWrap:"wrap", alignContent:'space-around'}}>
          {DEMOS.map((demo: Demo, i: number) =>
              <div style={{margin:5}}>
                <Card 
                  style ={{width:300,height:300,order:i}}
                  cover={<img alt="No Image" src={getThumbnail(demo)} width={300}/>}
                  hoverable={true}
                  extra={<Button danger={demo.isWIP}
                                 type={'primary'} 
                                 shape='round'
                                 size='small' 
                                 style={{display:'flex', 
                                 alignItems: 'center', 
                                 justifyContent:'center'}}>
                                   {demo.isWIP ? "Test" : "Run"} <PlayCircleOutlined/>
                                </Button>}
                  onClick = {()=> histroy.push(`/${getDemoIdentifer(demo)}`)}
                  title={demo.title} 
                > 
                </Card>
              </div>
          )} 
      </div>
    </div>
  );
}
