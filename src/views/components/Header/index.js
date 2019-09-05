import React from "react";
import { connect } from "react-redux";
import * as _ from "underscore";
import "./style.less";
import cls from "classnames";
import Overlay from "../../../common/Overlay";
import Login from "./login";
import { toggleBody } from "../../../untils";
import system from "../../../api/system";
import { Link, withRouter } from "react-router-dom";
import SearchInput from "../../../common/SearchInput";

const Logo = require("../../../assets/images/logo.png");
const Placeholder = require("../../../assets/images/placeholder.png");

class HeaderComponent extends React.Component {
  state = {
    active: false,
    show_head: false,
    menu: [],
    keyword: ""
  };
  componentDidMount() {
    this.handler = _.debounce(this.scrollEvent, 100);
    // 监听滚动
    window.addEventListener("scroll", this.handler, false);
    // 获取文章分类
    this.getCategory();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handler, false);
    toggleBody(0);
  }

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
      // 因为要先让父级元素显示出来，所以加个延迟才行
      setTimeout(() => {
        this.searchInput.focus();
      }, 200);
      return { active: !prev.active };
    });
  };

  render() {
    const { active, show_head, menu } = this.state;
    return (
      <div className={cls("v-header", { active: active, show: show_head })}>
        <div className="v-header-box">
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
            <Login />
          </div>
          {/*搜索面板*/}
          <div className={cls("v-header-search", { active: active })}>
            <div className="v-header-search-warp">
              <div className="form">
                <SearchInput inputRef={el => (this.searchInput = el)} />
              </div>
              <div className="cd-search-suggestions">
                <div className="news">
                  <h3>热门新闻</h3>
                  <ul>
                    <li>
                      <a className="image-wrapper" href="#0">
                        <img src={Placeholder} alt="News" />
                      </a>
                      <h4>
                        <a className="cd-nowrap" href="#0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit.
                        </a>
                      </h4>
                      <time dateTime="2016-01-12">Feb 03, 2016</time>
                    </li>
                    <li>
                      <a className="image-wrapper" href="#0">
                        <img src={Placeholder} alt="News" />
                      </a>
                      <h4>
                        <a className="cd-nowrap" href="#0">
                          Incidunt voluptatem adipisci voluptates fugit beatae
                          culpa eum, distinctio, assumenda est ad
                        </a>
                      </h4>
                      <time dateTime="2016-01-12">Jan 28, 2016</time>
                    </li>
                    <li>
                      <a className="image-wrapper" href="#0">
                        <img src={Placeholder} alt="News" />
                      </a>
                      <h4>
                        <a className="cd-nowrap" href="#0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Iusto, esse.
                        </a>
                      </h4>
                      <time dateTime="2016-01-12">Jan 12, 2016</time>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*蒙版*/}
        {active ? <Overlay click={this.trigger} /> : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default withRouter(connect(mapStateToProps)(HeaderComponent));
