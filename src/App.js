import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/header/Header';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;