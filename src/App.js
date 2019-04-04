import React, {Component} from 'react';
import Globalstyle from "./assets/style/reset";
import FlexStyle from "./assets/style/flex";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomeComponent from "./views/home";
import DetailComponent from "./views/detail";
import TrendingComponent from "./views/trending";
import LoginComponent from "./views/login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Globalstyle/>
        <FlexStyle/>
        <Router>
          <div className="views">
            <Route exact path="/" component={HomeComponent}/>
            <Route exact path="/post/:id" component={DetailComponent}/>
            <Route exact path="/trending/:type" component={TrendingComponent}/>
            <Route exact path="/login" component={LoginComponent}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
