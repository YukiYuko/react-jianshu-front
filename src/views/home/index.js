import React, { Component } from "react";
import { Left, Right, HomeContainer, ViewFooter } from "./style";
import Banner from "./components/Banner";
import Topic from "./components/Topic";
import Vheader from "../components/Header";
import RecommendAuthor from "./components/RecommendAuthor";
import Article from "./components/Article";
import RandArticle from "./components/RandArticle";
import HotComment from "./components/HotComment";
import FriendLink from "./components/FriendLink";
import Census from "./components/Census";
import { Row, Col, BackTop } from "antd";
import Widget from "../components/widget";
import Wave from "../../common/Wave";
import Wave2 from "../../common/Wave2";
import Parallax from "parallax-js";
import classie from "../../untils/classie";
import {connect} from "react-redux";

class HomeComponent extends Component {
  state = {
  };
  componentDidMount() {
    let scene = document.getElementById("scene");
    new Parallax(scene);
    this.setActive();
  }
  setActive() {
    setTimeout(() => {
      classie.add(document.querySelector(".center-widget"), "active")
    }, 200)
  }
  render() {
    return (
      <HomeContainer>
        {/*<Header />*/}
        <Vheader user={this.props.user}/>
        {/*menu*/}
        {/*首页背景*/}
        <div className="homeBanner">
          {/*面包按钮*/}
          {/*<div onClick={this.toggleMenu} className={cls("hamburger hamburger-1", {"active": visible})}>*/}
            {/*<span className="line"/>*/}
            {/*<span className="line"/>*/}
            {/*<span className="line"/>*/}
          {/*</div>*/}
          {/*个人介绍*/}
          <div className="card-container" data-depth="0.6">
            <div className="card">
              <h1>星白凛☆Daze~</h1>
              <h1>QQ: 690517217</h1>
              <h3>职业: 前端切图API调用页面仔</h3>
              <h3>年龄: 18岁(你信吗)</h3>
              <p>
                <i className="iconfont icon-weibo"/>
                <i className="iconfont icon-weixin"/>
                <i className="iconfont icon-qq"/>
                <i className="iconfont icon-twitter"/>
              </p>
              <div className="circle"/>
              <div className="circle"/>
            </div>
          </div>
          <div id="scene">
            {/*中间层*/}
            <ul className="center-widget" data-depth="0.6">
              <li className="center-widget-item">

              </li>
              <li className="center-widget-item">

              </li>
              <li className="center-widget-item">

              </li>
              <li className="center-widget-item">

              </li>
            </ul>
            {/*左侧*/}
            <div id="left-menu-layer" data-depth="0.2">
              <div className="left-menu-box">
                <div className="left-menu-box-container">
                  <div className="top">
                    <div className="dialog" />
                  </div>
                </div>
              </div>
            </div>
            {/*右侧*/}
            <div id="right-menu-layer" data-depth="0.2">
              <div className="right-menu-box">
                <div className="right-menu-box-container">
                  <div className="share" />
                </div>
              </div>
            </div>
          </div>
          <Wave2 />
        </div>
        <div
          className="warp960"
          style={{ paddingTop: "20px", paddingBottom: "380px" }}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={16}>
              <Left>
                <Banner />
                <Article />
              </Left>
            </Col>
            <Col className="gutter-row" span={8}>
              <Right>
                <Topic />
                <RecommendAuthor />
                <Widget title="随机文章">
                  <RandArticle />
                </Widget>
                <Widget title="热门评论">
                  <HotComment />
                </Widget>
                <Widget title="友情链接">
                  <FriendLink />
                </Widget>
                <Widget title="站点统计">
                  <Census />
                </Widget>
              </Right>
            </Col>
          </Row>
          <Wave />
          <BackTop />
        </div>
        {/*footer*/}
        <ViewFooter>
          <div className="footer-image" />
          <div className="warp960">
            <p id="open-button">Yuki-欢迎光临我的世界</p>
          </div>
        </ViewFooter>
      </HomeContainer>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
