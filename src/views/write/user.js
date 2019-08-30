import React, {Component} from "react";
import {removeStorage} from "../../untils/localstorage";
import {bindActionCreators} from "redux";
import {set_user} from "../../store/modules/user/actions";
import {connect} from "react-redux";
import "./user.less"
import {persistor} from "../../store";

class UserComponent extends Component {
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
      window.location.href = "/login";
    });
  };

  render() {
    const {user} = this.props;
    const NoLogin = () => (
      <div className="user_no_login flex items-center">
aaa
      </div>
    );
    const IsLogin = () => (
      <div className="user_is_login flex items-center">
        <img src={user.avatar} alt={user.nickname}/>
        <div className="user_menu">
          <div className="user_menu_item">
            <span >写文章</span>
            <span >草稿</span>
          </div>
          <div className="user_menu_item">
            <span >我的主页</span>
            <span >我喜欢的</span>
            <span >我的收藏集</span>
          </div>
          <div className="user_menu_item">
            <span >设置</span>
            <span  onClick={this.loginOut}>退出</span>
          </div>
        </div>
      </div>
    );
    return (
      <div className="user_warp flex">
        {
          user.id ? <IsLogin/>:<NoLogin/>
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent)
