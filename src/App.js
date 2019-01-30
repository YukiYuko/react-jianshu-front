import React, {Component} from 'react';
import Header from "./common/Header/Header";
import Globalstyle from "./assets/style/reset";
import FlexStyle from "./assets/style/flex";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomeComponent from "./views/home";
import DetailComponent from "./views/detail";
import TrendingComponent from "./views/trending";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Globalstyle/>
        <FlexStyle/>
        <Router>
          <div>
            <Header/>
            <div className="views" style={{paddingTop: "30px"}}>
              <Route exact path="/" component={HomeComponent}/>
              <Route exact path="/post/:id" component={DetailComponent}/>
              <Route exact path="/trending/:type" component={TrendingComponent}/>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
