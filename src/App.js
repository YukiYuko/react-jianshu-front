import React, { Component } from "react";
import FlexStyle from "./assets/style/flex";
import {BrowserRouter as Router} from "react-router-dom";
import renderRoutes from "./routes/renderRoutes";
import routes from "./routes/index";
import ScrollTop from "./common/ScrollTop/index";
import { set_user } from "./store/modules/user/actions";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "./App.css";
import "./assets/style/var.less";
import "./assets/style/reset.less";
import "effect-dropdown-react/dist/index.css";
import Song from "./common/Song";

class App extends Component {
  componentDidMount() {
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
  render() {
    const authed = !!this.props.user.id; // 如果登陆之后可以利用redux修改该值(关于redux不在我们这篇文章的讨论范围之内）
    const authPath = '/login'; // 默认未登录的时候返回的页面，可以自行设置
    return (
      <LocaleProvider locale={zh_CN}>
        <div className="App">
          {/*<Globalstyle/>*/}
          <FlexStyle />
          <Song />
          <Router>
            <div className="views">
              <ScrollTop>
                {renderRoutes(routes, authed, authPath)}
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
