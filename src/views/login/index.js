import React, {Component} from "react";
import "./style.less";
import {Divider, Icon, Tooltip} from "antd";
import Loading from "../../common/Loading";
import Register from "../register";
import { CSSTransition } from 'react-transition-group';
import cls from "classnames";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      loading: false,
      show: false,
    }
  }

  toggle () {
    this.setState((prev) => ({
      loading: !prev.loading
    }))
  }
  openRegister = () => {
    this.setState({show: true})
  };
  closeRegister = () => {
    this.setState({show: false})
  };

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
          <Register close={this.closeRegister}/>
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
              <input type="text" placeholder="用户名"/>
            </div>
            <div className="login-view-form-item">
              <div>
                <Icon type="lock"/>
              </div>
              <input type="text" placeholder="密码"/>
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

export default LoginView
