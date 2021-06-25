import React, {FunctionComponent} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import Header from './components/header/Header';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { Demo } from './models/definitions'
import { getDemo } from './models/demos'
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:key" exact component={({match: {params: { key }}}) => {
              const demo: Demo = getDemo(key)
              return demo !== null ? DemoPage(demo) : NotFound()
          }} />    
          <Route component={NotFound} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;