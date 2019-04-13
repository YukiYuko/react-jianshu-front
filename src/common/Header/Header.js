import React, {Component} from "react";
import {HeadWarper} from "./style";
import {connect} from "react-redux";
import LogoComponent from "./Logo";
import NavComponent from "./Nav";
import LoginComponent from "./Login";

class HeaderComponent extends Component {
  render() {
    const {user} = this.props;
    return (
      <HeadWarper>
        <div className="warp1440 flex">
          <LogoComponent/>
          <NavComponent/>
          <LoginComponent user={user}/>
        </div>
      </HeadWarper>
    )
  }
}
const mapStateToProps = (state) => ({
  user: state.user
});
export default connect(mapStateToProps)(HeaderComponent);
