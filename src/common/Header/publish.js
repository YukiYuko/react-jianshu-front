import React from "react"
import {Publish} from "./style";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import {public_confirm} from "../../actions";
class LogoComponent extends React.PureComponent {
  toPublish = () => {
    if (!this.props.user.id) {
      public_confirm("您还未登录，现在去登录吗").then(() => {
        this.props.history.push({
          pathname: "/login",
          state: {
            from:this.props.location.pathname
          }
        });
      });
    } else {
      this.props.history.push({
        pathname: "/write/create"
      });
    }
  };
  render() {
    return (
      <Publish onClick={this.toPublish}>
        发布文章
      </Publish>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});
export default withRouter(connect(mapStateToProps)(LogoComponent));
