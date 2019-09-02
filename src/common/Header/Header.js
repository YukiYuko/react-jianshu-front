import React, {Component} from "react";
import {HeadWarper} from "./style";
import {connect} from "react-redux";
import LogoComponent from "./Logo";
import NavComponent from "./Nav";
import LoginComponent from "./Login";
import PublishComponent from "./publish";
import * as _ from "underscore";

class HeaderComponent extends Component {
  scrollEvent = () => {
  };
  componentDidMount() {
    window.addEventListener("scroll", _.debounce(this.scrollEvent, 250))
  }
  componentWillReceiveProps(newProps, nextContext) {
  }
  render() {
    const {user} = this.props;
    return (
      <HeadWarper>
        <div className="warp1440 flex items-center">
          <LogoComponent/>
          <NavComponent type={this.props.type}/>
          <PublishComponent/>
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
