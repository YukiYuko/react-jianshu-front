import React, {Component} from "react";
import "./style.less";
import "./style.scss";
import "../../assets/style/slide.less";
import {Divider, Icon, Tooltip} from "antd";
import Loading from "../../common/Loading";
import Register from "../register";
import Logo from "../../common/Header/Logo";
import { CSSTransition } from 'react-transition-group';
import cls from "classnames";
import {tips} from "../../actions";
import user from "../../api/user";
import {setStorage} from "../../untils/localstorage";
import {connect} from "react-redux";
import mojs from "mo-js"
import {NavLink, withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {set_user} from "../../store/modules/user/actions";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      loading: false,
      show: false,
      email: "",
      password: ""
    };
  }
  componentWillMount() {
    if (this.props.user.id) {
      this.props.history.replace("/");
    }
  }

  toggle () {
    this.setState(() => ({
      loading: true
    }));
    user.login({email: this.state.email, password: this.state.password}).then((res) => {
      setTimeout(() => {
        this.setState({loading: false});
        tips("登录成功!", "success");
        setStorage("token", res.data.token);
        // 登录之后获取用户信息
        user.getUser().then((res) => {
          this.props.set_user(res.data);
          setStorage("uid", res.data.id);
          //来源记录
          let from;
          if(this.props.location && this.props.location.state != null){
            from = this.props.location.state.from
          }
          const urlTo = from || '/';
          this.props.history.replace(urlTo);
        })
      }, 1000);
    }).catch(() => {
      this.setState({loading: false})
    })
  }
  closeLoading = () => {
    this.setState((prev) => ({
      loading: false
    }));
  };
  openRegister = () => {
    this.setState({show: true})
  };
  closeRegister = () => {
    this.setState({show: false, loading: false})
  };
  reg = () => {
    this.setState({loading: true})
  };


  // 鼠标点击效果
  clickAnime() {
    console.clear();

    const pop = new mojs.Shape({
      fill: 'none',
      stroke: {'#27ae60':'#c0392b'},
      radius: {0:80},
      strokeWidth: {8:0},
      opacity: {1:0},
      duration: 1000
    });

    const burst = new mojs.Burst({
      radius: {0:100},
      angle: {0:100, easing: 'cubic.out'},
      count: 25,
      children: {
        radius: {0:10},
        shape: 'circle',
        fill: {'#fff':'#8e44ad'},
        duration: 800
      }
    });

    const spark = new mojs.Burst({
      radius: {0:150},
      angle: {0: -60},
      count: 10,
      children: {
        shape: 'line',
        stroke: {'#d35400':'#e67e22'},
        strokeWidth: {5:2},
        duration: 800
      }
    });

    const lines = new mojs.Burst({
      radius: {50:150},
      count: 10,
      children: {
        shape: 'line',
        stroke: '#222',
        strokeWidth: 4,
        opacity: {1:0},
        duration: 1000
      }
    });


    const triangles = new mojs.Burst({
      radius: {50:150},
      angle: {0: 120},
      count: 15,
      children: {
        shape: 'polygon',
        points: 3,
        fill: '#16a085',
        duration: 1500
      }
    });

    let animArr = [];
    animArr.push(pop, burst, spark, triangles, lines);


    window.addEventListener('mousedown', (e) => {
      animArr.forEach(anim => {
        anim.el.style.top = 0;
        anim.el.style.left = 0;
        anim.tune({x: e.x, y: e.y}).replay();
      })
    })
  }

  componentDidMount() {
  }

  render() {
    const {loading, show} = this.state;
    return (
      <div className="login-view">
        <div className="login-logo">
          <Logo />
        </div>
        <ul className="ken-burns-slideshow">
          <li className="slide" id="slide1" />
          <li className="slide" id="slide2" />
          <li className="slide" id="slide3" />
          <li className="slide" id="slide4" />
        </ul>
        {/*
        一个小小的动画
        <div className="animation3d">
          <div className="reverseRotate">
            <div className="rotate">
              <div className="content">正负旋转相消3D动画</div>
            </div>
          </div>
        </div>
        */}
        {
          loading && <Loading/>
        }
        <CSSTransition
          in={show}
          timeout={300}
          classNames="slide"
          unmountOnExit
          onEnter={() => this.setState({show: true})}
          onExited={() => this.setState({show: false})}
        >
          <Register reg={this.reg} close={this.closeRegister} closeLoading={this.closeLoading}/>
        </CSSTransition>
        <div className={cls('login-view-box', {'loading': !!loading || show})}>
          <div className="login-view-title flex justify-between">
            <span>账号登录</span>
            <span onClick={this.openRegister} className="login-view-reg">注册</span>
          </div>
          <div className="login-view-form">
            <div className="login-view-form-item">
              <div>
                <Icon type="user"/>
              </div>
              <input onChange={(e) => this.setState({email: e.target.value})} type="text" placeholder="用户名"/>
            </div>
            <div className="login-view-form-item">
              <div>
                <Icon type="lock"/>
              </div>
              <input onChange={(e) => this.setState({password: e.target.value})} type="password" placeholder="密码"/>
            </div>
          </div>
          <div className="login-view-btn flex justify-between">
            <div onClick={this.toggle}>登录</div>
            <div> <NavLink to="/forgot">忘记密码</NavLink></div>
          </div>
          <Divider style={{color: "#afb1be", padding: "0 20px", margin: "20px auto"}}>社交账号登录</Divider>
          <div className="login-view-society flex justify-center">
            <div>
              <Tooltip placement="top" title="qq">
                <Icon type="qq"/>
              </Tooltip>
            </div>
            <div>
              <Tooltip placement="top" title="微博">
                <Icon type="weibo"/>
              </Tooltip>
            </div>
            <div>
              <Tooltip placement="top" title="微信">
                <Icon type="wechat"/>
              </Tooltip>
            </div>
            <div>
              <Tooltip placement="top" title="github">
                <Icon type="github"/>
              </Tooltip>
            </div>
          </div>
          {/*<div className="social-share"/>*/}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    set_user
  }, dispatch)
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView));
