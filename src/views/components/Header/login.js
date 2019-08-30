import React from "react";
import {Dropdown, Popover, Menu} from "antd";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import {removeStorage} from "../../../untils/localstorage";
import {persistor} from "../../../store";

class HomeLogin extends React.PureComponent {
  loginOut = () => {
    removeStorage("token");
    removeStorage("uid");
    persistor.purge().then(() => {
      window.location.reload();
    });
  };
  render() {
    const { user } = this.props;
    const noLoginMenu = (
      <div>
        <p>
          <Link to={`/login`} className="reg">去登录</Link>
        </p>
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
      <Dropdown placement="bottomCenter" overlay={menu}>
        <div className="user_info flex items-center justify-center">
          <img src={user.avatar} alt={user.username} />
        </div>
      </Dropdown>
    );
    return (
      <>
        {user.id ? (
          <div className="v-header-login-isLogin">
            <IsLogin />
          </div>
        ) : (
          <Popover placement="bottom" content={noLoginMenu} trigger="hover">
            <div className="v-header-login-notLogin flex items-center justify-center">
              <Link to={`/login`} className="reg"><i className="iconfont icon-yonghu" /></Link>
            </div>
          </Popover>
        )}
      </>
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
)(HomeLogin);
