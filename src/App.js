import React, { Component } from "react";
// import Globalstyle from "./assets/style/reset";
import FlexStyle from "./assets/style/flex";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HomeComponent from "./views/home";
import DetailComponent from "./views/detail";
import TrendingComponent from "./views/trending";
import SearchComponent from "./views/search";
import LoginComponent from "./views/login";
import ForgotComponent from "./views/forgot";
import ForgotResetComponent from "./views/forgot/reset";
import AboutComponent from "./views/about";
import MessageComponent from "./views/message";
import CategoryComponent from "./views/category";
import TagComponent from "./views/tag";
import ProfileComponent from "./views/profile";
import WriteComponent from "./views/write";
import DraftComponent from "./views/write/draft";
import ScrollTop from "./common/ScrollTop/index";
import user from "./api/user";
import { set_user } from "./store/modules/user/actions";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { getStorage, setStorage } from "./untils/localstorage";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "./App.css";
import "./assets/style/var.less";
import "./assets/style/reset.less";
import "effect-dropdown-react/dist/index.css";
import Song from "./common/Song";

class App extends Component {
  componentDidMount() {
    // let token = getStorage("token");
    // if (token && window.location.pathname.indexOf("login") === -1) {
    //   this.getUser();
    // }

    // 监听窗口失去焦点和获取焦点
    window.addEventListener(
      "blur",
      () => {
        document.title = "啊，我失去焦点了";
      },
      true
    );
    window.addEventListener(
      "focus",
      () => {
        document.title = "啊，我获得焦点了";
      },
      true
    );
  }
  // 获取用户信息
  getUser = () => {
    user.getUser().then(res => {
      this.props.set_user(res.data);
      setStorage("uid", res.data.id);
    });
  };
  render() {
    console.log(this.props.user);
    return (
      <LocaleProvider locale={zh_CN}>
        <div className="App">
          {/*<Globalstyle/>*/}
          <FlexStyle />
          <Song />
          <Router>
            <div className="views">
              <ScrollTop>
                <Route exact path="/" component={HomeComponent} />
                <Route path="/post/:id" component={DetailComponent} />
                <Route path="/category/:type" component={CategoryComponent} />
                <Route path="/tag/:id" component={TagComponent} />
                <Route path="/trending/:type" component={TrendingComponent} />
                <Route path="/search" component={SearchComponent} />
                <Route path="/profile/:type" component={ProfileComponent} />
                <Route path="/about" component={AboutComponent} />
                <Route path="/message" component={MessageComponent} />
                <Route path="/write/:type" component={WriteComponent} />
                <Route path="/draft" component={DraftComponent} />
                <Route
                  path="/login"
                  component={() =>
                    this.props.user.id ? (
                      <Redirect to="/" />
                    ) : (
                      <LoginComponent />
                    )
                  }
                />
                <Route path="/forgot" component={ForgotComponent} />
                <Route path="/forgot/reset" component={ForgotResetComponent} />
              </ScrollTop>
            </div>
          </Router>
        </div>
      </LocaleProvider>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      set_user
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
