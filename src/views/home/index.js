import React, {Component} from "react";
import {Left, Right, HomeContainer, ViewFooter} from "./style";
import Banner from "./components/Banner";
// import Topic from "./components/Topic";
import Dreaming from "./components/Dreaming";
import Vheader from "../components/Header";
import RecommendAuthor from "./components/RecommendAuthor";
import Article from "./components/Article";
import RandArticle from "./components/RandArticle";
import HotComment from "./components/HotComment";
import FriendLink from "./components/FriendLink";
import Census from "./components/Census";
import {Row, Col, BackTop, Affix} from "antd";
import Widget from "../components/widget";
import Wave2 from "../../common/Wave2";
import Parallax from "parallax-js";
import classie from "../../untils/classie";
import {connect} from "react-redux";
import weather from "../../api/weather";

class HomeComponent extends Component {
  state = {
    weatherData: {}
  };

  componentDidMount() {
    let scene = document.getElementById("scene");
    new Parallax(scene);
    this.getWeather();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setActive() {
    this.timer = setTimeout(() => {
      classie.add(document.querySelector(".center-widget"), "active");
    }, 200);
  }

  // 获取天气
  getWeather() {
    weather.getNormalWeather().then(res => {
      if (res.status === 200) {
        this.setState(
          {
            weatherData: res.data.HeWeather6[0].now
          }
        );
      }
      this.setActive();
    });
  }

  // 获取浏览器位置
  getLocation = () => {
    // 该方法只有在Edge上有用
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("position", position);
        document.getElementById("location").innerHTML =
          "纬度：" +
          position.coords.latitude +
          "\n经度：" +
          position.coords.longitude;
      }, this.showError);
    } else {
      console.log("该浏览器不支持定位功能！");
    }
  };
  showError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("用户拒绝对获取地理位置的请求。");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("位置信息是不可用的。");
        break;
      case error.TIMEOUT:
        console.log("请求用户地理位置超时。");
        break;
      case error.UNKNOWN_ERROR:
        console.log("未知错误。");
        break;
      default:
        console.log("未知错误。");
        break;
    }
  };

  render() {
    const {weatherData} = this.state;
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
              {/*<div id="location" onClick={this.getLocation}>获取地理位置</div>*/}
              <p>
                <a rel="noopener noreferrer" target="_blank"
                   href="https://weibo.com/1799261255/profile?rightmod=1&wvr=6&mod=personinfo"><i
                  className="iconfont icon-weibo"/></a>
                {/*<i className="iconfont icon-weixin" />*/}
                {/*<i className="iconfont icon-qq" />*/}
                {/*<i className="iconfont icon-twitter" />*/}
              </p>
              <div className="circle"/>
              <div className="circle"/>
            </div>
          </div>
          <div id="scene">
            {/*天气*/}
            <ul className="center-widget" data-depth="0.6">
              <li className="center-widget-item">
                <h2>温度</h2>
                <div className="val">
                  {weatherData.tmp}
                  <small>
                    <sup>°</sup>c
                  </small>
                </div>
              </li>
              <li className="center-widget-item">
                <h2>体感温度</h2>
                <div className="val">
                  {weatherData.fl}
                  <small>
                    <sup>°</sup>c
                  </small>
                </div>
              </li>
              <li className="center-widget-item">
                <h2>天气状况</h2>
                <div className="val">{weatherData.cond_txt}</div>
              </li>
              <li className="center-widget-item">
                <h2>能见度</h2>
                <div className="val">{weatherData.vis}/km</div>
              </li>
            </ul>
            {/*左侧*/}
            <div id="left-menu-layer" data-depth="0.2">
              <div className="left-menu-box">
                <div className="left-menu-box-container">
                  <div className="top">
                    <div className="dialog"/>
                  </div>
                </div>
              </div>
            </div>
            {/*右侧*/}
            <div id="right-menu-layer" data-depth="0.2">
              <div className="right-menu-box">
                <div className="right-menu-box-container">
                  <div className="share"/>
                </div>
              </div>
            </div>
          </div>
          <Wave2/>
        </div>
        <div
          className="warp960"
          style={{paddingTop: "20px", paddingBottom: "380px"}}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={16}>
              <Left>
                <Banner/>
                <Article/>
              </Left>
            </Col>
            <Col className="gutter-row" span={8}>
              <Right>
                <Dreaming/>
                <RecommendAuthor/>
                <Widget title="随机文章">
                  <RandArticle/>
                </Widget>
                <Widget title="热门评论">
                  <HotComment/>
                </Widget>
                <Affix offsetTop={90} onChange={affixed => console.log(affixed)}>
                  <Widget title="友情链接">
                    <FriendLink/>
                  </Widget>
                  <Widget title="站点统计(暂时未做)">
                    <Census/>
                  </Widget>
                </Affix>
              </Right>
            </Col>
          </Row>
          <BackTop/>
        </div>
        {/*footer*/}
        <ViewFooter>
          <div className="footer-image"/>
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
