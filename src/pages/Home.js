import React from 'react';
import { Card, Button } from 'antd';
const demos = require('../demos.json')

export default function Home() {
  return (
    <div>
        <div className="Main">
          {/* About Card */}
          <Card title={'About'} className="AboutCard">
            <p>
              This website was developed by <a href='https://zawie.io'>Adam Zawierucha</a> as a fun side project. It's goal is to aggregate useful physics and mathematics demonstrations
               for education use. If you are an eductator or student and have any suggestions (either new demo ideas or new features) please contact the developer at <a href="mailto:zawie@rice.edi">zawie@rice.edu</a>. 
            </p>
            <p>
              To get started, click the <Button type="primary" shape="round">Run</Button> button on one of the cards below. To return to this homepage, simply click the navigation bar.
              Have fun! :)
            </p>
          </Card>
          {/* Create a card for each demo in demos.json */}
          {Object.keys(demos).map((key,i) => {
            let demo = demos[key];
            return(
              <>
                <br></br>
                <Card title={demo['title']} className="AboutCard">
                  <p>{demo['description']}</p>
                  <Button href={`/demos/${key}`} type="primary" shape="round">Run</Button>              
                </Card>
              </>
            );
          }
          )} 
        </div>
      </div>
  );
}
