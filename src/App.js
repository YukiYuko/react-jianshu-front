import React, { Component } from 'react';
import Header from "./common/Header/Header";
import Globalstyle  from "./assets/style/reset";
import FlexStyle from "./assets/style/flex";
class App extends Component {
  render() {
    return (
      <div className="App">
          <Globalstyle/>
          <FlexStyle/>
          <Header/>
      </div>
    );
  }
}

export default App;
