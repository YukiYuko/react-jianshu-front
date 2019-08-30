import React from "react";
import "./HotComment.less";
import comments from "../../../api/comment";
import {formatTime} from "../../../untils";
import {NavLink} from "react-router-dom";

class HotCommentComponent extends React.PureComponent {
  state = {
    list: []
  };

  componentDidMount() {
    this.getHotComments();
  }

  // 获取热门评论
  getHotComments() {
    comments.commentHot().then(res => {
      this.setState({
        list: res.data
      })
    });
  }

  render() {
    const {list} = this.state;
    return (
      <div className="hot-comment">
        {
          list.map((item, index) => (
            <div className="hot-comment-item flex" key={index}>
              <div className="left">
                <img
                  src="https://q.qlogo.cn/headimg_dl?bs=qq&dst_uin=343049466@qq.com&src_uin=qq.feixue.me&fid=blog&spec=100&id=72"
                  alt=""
                />
              </div>
              <div className="right box1">
                <h3>
                  {item.user.username} <span>（{formatTime(item.createdAt)}）</span> <span>{item.like.length} 赞</span>
                </h3>
                <p>
                  {item.content}
                </p>
                <NavLink to={`/post/${item.post.id}`} className="ellipsis">
                  评：{item.post.title}
                </NavLink>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default HotCommentComponent;
