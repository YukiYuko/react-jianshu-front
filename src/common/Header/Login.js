import React, {Component} from "react";
import {Login, LoginRegBox, Reg} from "./style";
import {Link} from "react-router-dom";
import {Menu, Dropdown} from "antd";
import {removeStorage} from "../../untils/localstorage";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }
  loginOut = () => {
    console.log(this.props);
    removeStorage("token");
    window.location.href = "/login";
  };

  render() {
    const {user} = this.props;
    const NoLogin = () => (
      <div className="no_login flex">
        <Login>
          <a href="/">Aa</a>
          <Link to="/login">登录</Link>
        </Login>
        <Reg>
          <Link to="/login" className="reg">注册</Link>
          {/*<a href="/" className="write">写文章</a>*/}
        </Reg>
      </div>
    );
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人中心</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">设置</a>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.loginOut}>退出</span>
        </Menu.Item>
      </Menu>
    );
    const IsLogin = () => (
      <Dropdown overlay={menu}>
        <div className="is_login">
          <div className="user_info flex items-center justify-center">
            <img src={user.avatar} alt={user.username}/>
            <span>{user.username}</span>
          </div>
        </div>
      </Dropdown>
    );
    return (
      <LoginRegBox className="flex">
        {
          user.id ? <IsLogin/>:<NoLogin/>
        }
      </LoginRegBox>
    )
  }
}

export default LoginComponent
