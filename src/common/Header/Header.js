import React, {Component} from "react";
import {HeadWarper} from "./style";
import {connect} from "react-redux";
import LogoComponent from "./Logo";
import NavComponent from "./Nav";
import LoginComponent from "./Login";
import {Affix} from "antd";

class HeaderComponent extends Component {
  render() {
    const {user} = this.props;
    return (
      <Affix offsetTop={0}>
        <HeadWarper>
          <div className="warp1440">
            <LogoComponent/>
            <NavComponent/>
            <LoginComponent user={user}/>
          </div>
        </HeadWarper>
      </Affix>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.user
});
export default connect(mapStateToProps)(HeaderComponent);
