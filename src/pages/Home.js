import React from 'react';
import { Card, Divider, Button} from 'antd';
import {useHistory} from 'react-router-dom';

const { Meta } = Card;
const demos = require('../demos.json')

export default function Home() {
  const histroy = useHistory();
  return (
    <div className="Main" style={{margin:"20px"}}>
      <Divider orientation="left">About</Divider> 
      <p>
        This site was developed by <a href="https://zawie.io">Adam Zawierucha</a> as a side project. The goal of this project is to create and host a variety of physics
        demonstrations and simulations for educational purposes. If you are an educator or studednt and have any suggestions for new demonstrations or features, or if you notice any erros,
        feel free to contact the developer at <a href="mailto:zawie@rice.edu">zawie@rice.edu</a>.

      </p>
      <p>
        Have fun! :)
      </p>
      <Divider orientation="left">Demos</Divider> 
      <div style = {{display:'flex',justifyContent:'center', flexWrap:"wrap", alignContent:'space-around'}}>
          {Object.keys(demos).map((key,i) => {
            let demo = demos[key];
            return(
              <div style={{margin:5}}>
                <Card 
                  style ={{width:300,height:300,order:i}}
                  cover={<img alt="No Image" src={require(`../thumbnails/${key}.png`)} width={300}/>}
                  hoverable={true}
                  extra={<Button type={'primary'} shape='round' size='small' > Run </Button>}
                  onClick = {()=> histroy.push(`/demos/${key}`)}
                  title={demo['title']} 
                > 
                </Card>
              </div>
            );
          })} 
      </div>
    </div>
  );
}
