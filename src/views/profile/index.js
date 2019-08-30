import React, { Component } from "react";
import {
  ProfileContainer,
  LeftBar,
  CenterContainer,
  RouteContainer,
  RightContainer
} from "./style";
import { Drawer, Tooltip } from "antd";
import { connect } from "react-redux";
import ProfileEdit from "./components/profileEdit/profileEdit";
import ProfileArticle from "./components/myArticle/myArticle";
import { getStorage, removeStorage } from "../../untils/localstorage";
import user from "../../api/user";
import FollowComponent from "./components/follow/follow";
import Soup from "./components/soup/soup";
import Meiriyiwen from "./components/meiriyiwen/meiriyiwen";
import {persistor} from "../../store";

const Logo = require("../../assets/images/logo.png");
class Profile extends Component {
  state = {
    show_profile: false,
    uid: getStorage("uid"),
    followNum: 0,
    focusNum: 0,
    collectNum: 0
  };

  onClose = () => {
    this.setState({
      show_profile: false
    });
  };
  openProfile = () => {
    this.setState({
      show_profile: true
    });
  };

  loginOut = () => {
    removeStorage("token");
    removeStorage("uid");
    persistor.purge().then(() => {
      window.location.href = "/";
    });
  };

  // 获取粉丝数
  getNum() {
    user.followNum(this.state.uid).then(res => {
      this.setState({
        followNum: res.data.followNum,
        focusNum: res.data.focusNum,
        collectNum: res.data.collectNum
      });
    });
  }


  componentDidMount() {
    this.getNum();
  }

  render() {
    const { user } = this.props;
    const { show_profile, followNum, focusNum, collectNum } = this.state;
    return (
      <ProfileContainer>
        <LeftBar>
          <div className="logo">
            <img
              onClick={() => (window.location.href = "/")}
              src={Logo}
              alt="Yuki, 雪落下的声音"
            />
          </div>
          <div className="loginOut flex items-center justify-center">
            <Tooltip placement="rightBottom" title="退出登录">
              <i onClick={this.loginOut} className="iconfont icon-tuichu" />
            </Tooltip>
          </div>
        </LeftBar>
        <CenterContainer>
          {/*个人简介*/}
          <div className="userInfo flex v-card">
            <div className="userInfo_avatar">
              <img src={user.avatar} alt="" />
            </div>
            <div className="userInfo_mess box1">
              <h3>{user.username}</h3>
              <p>职业: {user.job || "暂无"}</p>
              <p>公司: {user.company || "暂无"}</p>
              <p>个人介绍: {user.introduce || "暂无"}</p>
              <p>个人主页: {user.homepage || "暂无"}</p>
            </div>
            <div onClick={this.openProfile} className="userInfo_setting">
              个人资料
            </div>
          </div>
          {/*关注与收藏*/}
          <div className="follow flex justify-between">
            <div className="follow_item v-card">
              <p>关注</p>
              <p>{focusNum}</p>
            </div>
            <div className="follow_item v-card">
              <p>粉丝</p>
              <p>{followNum}</p>
            </div>
            <div className="follow_item v-card">
              <p>收藏</p>
              <p>{collectNum}</p>
            </div>
          </div>
          {/*我发布的文章*/}
          <ProfileArticle />
        </CenterContainer>
        <RouteContainer>
          <div className="routerWarp">
            <FollowComponent/>
            {/*<Route path={`${this.props.match.path}/following`} component={FollowComponent} />*/}
            {/*<Route path={`${this.props.match.path}/fans`} component={FollowComponent} />*/}
          </div>
        </RouteContainer>
        <RightContainer>
          <Soup/>
          <Meiriyiwen/>
        </RightContainer>
        {/*编辑个人信息*/}
        <Drawer
          width={640}
          title="编辑个人资料"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={show_profile}
        >
          <ProfileEdit cancel={this.onClose} />
        </Drawer>
      </ProfileContainer>
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
)(Profile);
