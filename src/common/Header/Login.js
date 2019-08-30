import React, {Component} from "react";
import {Login, LoginRegBox, Reg} from "./style";
import {Link} from "react-router-dom";
import {Menu, Dropdown} from "antd";
import {removeStorage} from "../../untils/localstorage";
import { persistor } from "../../store";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }
  loginOut = () => {
    removeStorage("token");
    removeStorage("uid");
    persistor.purge().then(() => {
      window.location.reload();
    });
  };

  render() {
    const {user} = this.props;
    const NoLogin = () => (
      <div className="no_login flex">
        <Login>
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
          <Link to={`/profile/following`} className="reg">个人中心</Link>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.loginOut}>退出</div>
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
