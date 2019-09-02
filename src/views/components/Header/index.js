import React from "react";
import { connect } from "react-redux";
import * as _ from "underscore";
import "./style.less";
import cls from "classnames";
import Overlay from "../../../common/Overlay";
import Login from "./login";
import { toggleBody } from "../../../untils";
import system from "../../../api/system";
import {Link, withRouter} from "react-router-dom";

const Logo = require("../../../assets/images/logo.png");

class HeaderComponent extends React.Component {
  state = {
    active: false,
    show_head: false,
    menu: []
  };
  componentDidMount() {
    this.handler = _.debounce(this.scrollEvent, 100);
    // 监听滚动
    window.addEventListener("scroll", this.handler, false);
    // 获取文章分类
    this.getCategory();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handler, false)
  }

  // onMouseLeave
  onMouseLeave = () => {
    if (window.scrollY === 0) {
      this.setState({
        show_head: false
      });
    }
  };
  // 滚动判定
  scrollEvent = () => {
    this.setState({
      show_head: window.scrollY > 0
    });
  };
  // 获取文章分类
  getCategory() {
    system.categoryList().then(res => {
      this.setState({
        menu: res.data
      });
    });
  }
  trigger = () => {
    this.setState(prev => {
      if (!prev.active) {
        toggleBody(1);
      } else {
        toggleBody(0);
      }
      return { active: !prev.active };
    });
  };
  render() {
    const { active, show_head, menu } = this.state;
    return (
      <div
        onMouseOver={() => this.setState({ show_head: true })}
        onMouseLeave={this.onMouseLeave}
        className={cls("v-header", { active: show_head })}
      >
        <div className="v-header-logo">
          <img src={Logo} alt="星白凛" />
        </div>
        <nav className="v-header-nav">
          <ul className="v-header-nav-box">
            {menu.map((item, index) => (
              <li key={index}>
                <Link to={`/category/${item.id}`}>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/message">
                <span>关于留言</span>
              </Link>
            </li>
          </ul>
          <span
            className={cls("v-header-nav-trigger", { active: active })}
            onClick={this.trigger}
          />
        </nav>
        {/*登录相关*/}
        <div className="v-header-login">
          <Login/>
        </div>
        {/*搜索面板*/}
        <div className={cls("v-header-search", { active: active })} />
        {active ? <Overlay click={this.trigger} /> : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default withRouter(connect(mapStateToProps)(HeaderComponent));
