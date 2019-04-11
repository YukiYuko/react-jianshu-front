import React, {Component} from 'react';
import Globalstyle from "./assets/style/reset";
import FlexStyle from "./assets/style/flex";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomeComponent from "./views/home";
import DetailComponent from "./views/detail";
import TrendingComponent from "./views/trending";
import LoginComponent from "./views/login";
import user from "./api/user";
import {set_user} from "./store/modules/user/actions";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {getStorage} from "./untils/localstorage";

class App extends Component {
  componentDidMount() {
    let token = getStorage("token");
    if (token) {
      this.getUser();
    }
  }
  getUser = () => {
    user.getUser().then((res) => {
      this.props.set_user(res.data);
    })
  };
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

const mapStateToProps = (state) => ({
  user: state.user
});
const mapDispatchToProps = {} = (dispatch) => {
  return bindActionCreators({
    set_user
  }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
