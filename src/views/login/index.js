import React, {Component} from "react";
import "./style.less";
import {Divider, Icon, Tooltip} from "antd";
import Loading from "../../common/Loading";
import Register from "../register";
import { CSSTransition } from 'react-transition-group';
import cls from "classnames";
import {tips} from "../../actions";
import user from "../../api/user";
import {setStorage, getStorage} from "../../untils/localstorage";
import {connect} from "react-redux";

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
    let token = getStorage("token");
    console.log(token);
  }

  toggle () {
    this.setState((prev) => ({
      loading: true
    }));
    user.login({email: this.state.email, password: this.state.password}).then((res) => {
      tips("登录成功!");
      setStorage("token", res.data.token);
      this.props.history.push("/");
      this.closeLoading();
    }).catch(() => {
      this.closeLoading();
    })
  }
  closeLoading = () => {
    setTimeout(() => {
      this.setState((prev) => ({
        loading: false
      }));
    }, 1000);
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

  componentDidMount() {
  }

  render() {
    const {loading, show} = this.state;
    return (
      <div className="login-view">
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
            <div>忘记密码</div>
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});
const mapDispatchToProps = () => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
