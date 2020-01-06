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
    user.list({uid: this.props.user.id}).then((res) => {
      this.setState(() => ({
        authors: res.data
      }));
    })
  };
  // 关注作者
  onFollow = (item, status) => {
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
    user.follow({uid, aid: item.id, status}).then(() => {
      let new_authors = [...this.state.authors];
      if (status === 2) {
        tips("取消关注成功", "success");
        new_authors.forEach((author) => {
          if (author.id === item.id) {
            author.is_follow = 0;
            author.followNum-=1;
          }
        });
      } else {
        tips("关注成功", "success");
        new_authors.forEach((author) => {
          if (author.id === item.id) {
            author.is_follow = 1;
            author.followNum+=1;
          }
        });
      }
      this.setState({
        authors: new_authors
      })
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
                    <span>写了 {nFormatter(item.num || 0)} 字</span>
                    <span>·</span>
                    <span>{nFormatter(item.followNum || 0)} 粉丝</span>
                  </p>
                </div>
                {
                  item.is_follow ? <div className="author-list-item-follow" onClick={() => this.onFollow(item, 2)}>
                    取消关注
                  </div> : <div onClick={() => this.onFollow(item, 1)} className="author-list-item-follow">
                    <i>+</i>
                    关注
                  </div>
                }

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
