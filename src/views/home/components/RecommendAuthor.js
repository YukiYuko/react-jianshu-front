import React, { Component } from "react";
import { RecommendAuthor } from "../style";
import Exchange from "../../../common/Exchange";
import user from "../../../api/user";
import { nFormatter } from "../../../untils";
import {getStorage} from "../../../untils/localstorage";
import {public_confirm, tips} from "../../../actions";
import {bindActionCreators} from "redux";
import {set_user} from "../../../store/modules/user/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class RecommendAuthorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }
  componentDidMount() {
    this.getData();
  }

  // 获取推荐作者
  getData = () => {
    user.list().then((res) => {
      this.setState(() => ({
        authors: res.data
      }));
    })
  };
  // 关注作者
  onFollow = (aid) => {
    if (!this.props.user.id) {
      public_confirm("您还未登录，现在去登录吗").then(() => {
        this.props.history.push({
          pathname: "/login",
          state: {
            from:this.props.location.pathname
          }
        });
      });
      return false;
    }
    let uid = this.props.user.id || getStorage("uid");
    if (!uid) {
      public_confirm("您还未登录，现在去登录吗").then(() => {
        this.props.history.push("/login");
      });
      return false;
    }
    user.follow({uid,aid}).then(() => {
      tips("关注成功", "success");
    })
  };

  render() {
    const { authors } = this.state;
    return (
      <RecommendAuthor>
        <div className="author-head flex justify-between items-center">
          <span className="title">推荐作者</span>
          <Exchange click={() => this.getData()} />
        </div>
        <div className="author-list">
          {
            authors.map((item, index) => (
              <div key={index} className="author-list-item flex justify-between items-center">
                <div className="author-list-item-image">
                  <img src={item.avatar} alt="" />
                </div>
                <div className="author-list-item-text box1">
                  <h3>{item.username}</h3>
                  <p>
                    <span>写了 {nFormatter(item.total_wordage || 0)} 字</span>
                    <span>·</span>
                    <span>{nFormatter(item.total_likes_count || 0)} 喜欢</span>
                  </p>
                </div>
                <div onClick={() => this.onFollow(item.id)} className="author-list-item-follow">
                  <i>+</i>
                  关注
                </div>
              </div>
            ))
          }
        </div>
      </RecommendAuthor>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    set_user
  }, dispatch)
};
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendAuthorComponent));
