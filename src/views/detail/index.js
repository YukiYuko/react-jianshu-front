import React, { Component } from "react";
import marked from "marked";
import { DetailWarp, Warp960 } from "./style";
import Back from "../../common/Back";
import article from "../../api/article";
import { BackTop, Tag, notification } from "antd";
import cls from "classnames";
import { connect } from "react-redux";
import comment from "../../api/comment";
import { tips, public_confirm } from "../../actions";
import Login from "../../common/Header/Login";
import LoadMore from "../components/loadmore";
import { getStorage } from "../../untils/localstorage";
import CommentTpl from "../../common/Comment";
import { formatTime } from "../../untils/index";
// import "../../assets/style/output.css";
// import Poster from "../../common/Poster";
import { drawCanvas } from "../../untils/poster";
import Qrcode from "qrcodejs2";
import Overlay from "../../common/Overlay";
import Catalog from "../../lib/progress-catalog/progress-catalog.js";
import "../../lib/progress-catalog/progress-catalog.css";

class DetailComponent extends Component {
  state = {
    id: "",
    detail: {},
    content: "",
    comments: [],
    total: 0,
    page: 1,
    loading: true,
    hasMore: true,
    text: "加载中...",
    like: false,
    reply: "",
    placeholder: "",
    replyId: "",
    is_click_share: false,
    posterImg: "",
    show: false
  };
  // 文章点赞
  like = () => {
    if (!this.props.user.id) {
      public_confirm("您还未登录，现在去登录吗").then(() => {
        this.props.history.push({
          pathname: "/login",
          state: {
            from: this.props.location.pathname
          }
        });
      });
      return false;
    }
    this.setState(
      prev => ({
        like: !prev.like
      }),
      () => {
        let status = this.state.like ? 1 : 0;
        let all_likes = this.state.all_likes;
        if (status) {
          all_likes++;
        } else {
          all_likes--;
        }
        this.setState({
          all_likes
        });
        let params = {
          postId: this.state.id,
          uid: this.props.user.id,
          status
        };
        article.articleLike(params).then(res => {});
      }
    );
  };
  // 评论点赞
  commentLike = item => {
    let uid = this.props.user.id || getStorage("uid");
    if (!uid) {
      public_confirm("您还未登录，现在去登录吗").then(() => {
        this.props.history.push("/login");
      });
      return false;
    }
    let index = item.like.findIndex(_item => _item.uid === uid);
    article
      .commentLike({
        commentId: item.id,
        uid,
        status: item.isLike ? 0 : 1
      })
      .then(() => {
        if (item.isLike) {
          item.like.splice(index, 1);
          item.isLike = false;
        } else {
          item.like.push({ commentId: item.id, uid });
          item.isLike = true;
        }
        this.setState({
          comments: this.state.comments
        });
      });
  };
  // 获取评论列表
  getComment = () => {
    let { comments, total, loading } = this.state;
    if (loading) {
      return false;
    }
    if (comments.length >= total) {
      this.setState({
        hasMore: false,
        text: "没有更多啦"
      });
      return false;
    }
    this.setState({
      loading: true,
      text: "加载中..."
    });
    this._getComment();
  };
  _getComment = () => {
    comment
      .commentList({ postId: this.state.id, page: this.state.page })
      .then(res => {
        setTimeout(() => {
          let isLike = item => {
            let uid = this.props.user.id || getStorage("uid");
            if (!uid) {
              return false;
            } else {
              let arr = item.like.filter(_item => _item.uid === uid);
              return !!arr.length;
            }
          };
          let data = res.data.data.map(item => {
            return { ...item, show: false, isLike: isLike(item) };
          });
          let comments = [...this.state.comments, ...data];
          let page = this.state.page + 1;
          this.setState({
            comments,
            total: res.data.count,
            page,
            loading: false,
            text: "加载更多"
          });
          if (comments.length >= res.data.count) {
            this.setState({
              hasMore: false,
              text: "没有更多啦"
            });
          }
        }, 300);
      });
  };
  // 获取详情
  getData = () => {
    article
      .articleDetail(this.state.id, this.props.user.id || getStorage("uid"))
      .then(res => {
        let uid = this.props.user.id || getStorage("uid");
        let arr = [];
        if (res.data.status !== 2) {
          notification.error({
            message: '提示',
            description:
              '该文章正在审核或者不存在',
            onClose: function () {
              window.location.replace("/");
            },
            duration: 3
          });
          return;
        }
        if (res.data.likes) {
          arr = res.data.likes.filter(item => item.uid === uid * 1);
        }
        this.setState(
          {
            detail: res.data,
            like: !!arr.length,
            all_likes: (res.data.likes && res.data.likes.length) || 0
          },
          () => {
            setTimeout(() => {
              new Catalog({
                contentEl: "content",
                catalogEl: `catalog-content`,
                selector: ["h1", "h2"],
                cool: false,
                scrollWrapper: document.querySelector(".detail-container")
              });
            }, 500);
          }
        );
      });
  };
  /*
   * pid: 父级评论ID
   * replyId: 当前评论的用户ID
   * */
  commentHandle = (pid = 0, type, item) => {
    let params = {
      postId: this.state.id,
      uid: this.props.user.id,
      content: this.state[type],
      pid,
      replyId: this.state.replyId || 0
    };
    if (!this.props.user.id) {
      public_confirm("您还未登录，现在去登录吗").then(() => {
        this.props.history.push("/login");
      });
      return false;
    }
    if (this.state[type].match(/^\s*$/)) {
      tips("请输入点儿东西吧~", "error");
      return false;
    }
    comment.commentCreate(params).then(res => {
      if (!item) {
        let data = { ...res.data, user: this.props.user, reply: [] };
        let comments = [data, ...this.state.comments];
        let total = this.state.total + 1;
        this.setState({
          comments,
          [type]: "",
          total
        });
      } else {
        let replyArr = item.reply.filter(
          _item => _item.uid === this.state.replyId
        );
        let data = {
          content: params.content,
          uid: params.uid,
          postId: params.postId,
          pid: params.pid,
          replyId: params.replyId,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
          user: this.props.user,
          reply_user: {
            id: params.replyId,
            username:
              (replyArr.length && replyArr[0].user.username) ||
              item.user.username
          }
        };
        item.reply.push(data);
        this.setState({
          comments: this.state.comments,
          [type]: ""
        });
      }
    });
  };
  // 绑定输入值
  changeHandle = (e, type) => {
    let v = e.target.value;
    let key = type ? type : "content";
    this.setState({
      [key]: v
    });
  };
  // 是否展示评论框
  showReply = (item, reply_item) => {
    // 收起所有的评论框
    this.state.comments.forEach(_item => {
      _item.show = false;
    });
    // 展示当前的评论框
    item.show = true;
    this.setState({
      comment: this.state.comments,
      reply: "",
      placeholder: `@${(reply_item && reply_item.user.username) ||
        item.user.username}:`,
      replyId: (reply_item && reply_item.uid) || item.uid
    });
  };
  // toggleShare
  toggleShare = () => {
    let is_click_share = this.state.is_click_share;
    this.setState(
      {
        is_click_share: !is_click_share
      },
      () => {}
    );
  };
  componentDidMount() {
    this.setState(
      {
        id: this.props.match.params.id
      },
      () => {
        this.getData();
        this._getComment();
      }
    );
  }
  setCode() {
    // 生成二维码
    let arr = [1555,3253,2001,4592,1340,3067,1314,3255,3568,4473,3269,1364,1452,3132,1449,1390,3225,1491,1509,4491,3250];
    let url = "http://bikego.com/public/app.php/biz/vendor/touristCertificate?vendorId=";
    arr.forEach((item,index) => {
      new Qrcode(document.querySelector(".set_code"+index), {
        text: url + item,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: Qrcode.CorrectLevel.H
      });
    })
  }
  // 生成截图
  async capture() {
    if (!this.code) {
      this.code = new Qrcode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: Qrcode.CorrectLevel.H
      });
    }
    let canvas = await drawCanvas(".poster");
    let url = canvas.toDataURL();
    this.setState({
      posterImg: url,
      show: true
    });
  }

  hideCanvas = e => {
    console.log(1);
    e.stopPropagation();
    this.setState({
      show: false
    });
  };
  // 评论相关
  DiscussPublish() {
    const { user } = this.props;
    const { content, total } = this.state;
    return (
      <div className="discuss-publish">
        <div className="discuss-publish-head">
          <em>{total} </em>
          条评论
        </div>
        <CommentTpl
          className="box1"
          user={user}
          content={content}
          changeHandle={this.changeHandle}
          commentHandle={() => this.commentHandle(0, "content")}
        />
      </div>
    );
  }
  CommentItem(item, index) {
    const { user } = this.props;
    const { reply, placeholder } = this.state;
    return (
      <div className="discuss-comment-item flex" key={index}>
        <div className="left">
          <img src={item.user.avatar} alt={item.user.username} />
        </div>
        <div className="right box1">
          <h3>
            {item.user.username}{" "}
            <span>
              {item.browser ? (
                <em className="os">
                  {item.browser} {item.os}
                </em>
              ) : (
                <em className="os">来自火星</em>
              )}
              {formatTime(item.createdAt)}
            </span>
          </h3>
          <p>{item.content}</p>
          <div className="reply flex justify-between items-center">
            <div className="reply-comment">
              <span onClick={() => this.showReply(item)}>回复</span>
            </div>
            <div className="reply-box">
              <div
                className={cls("heart", [{ active: item.isLike }])}
                onClick={() => this.commentLike(item)}
              >
                <i className="iconfont icon-dianzan" />
                <span> {item.like ? item.like.length : 0}</span>
              </div>
            </div>
          </div>
          <div className="reply-list">
            {item.reply.map((reply_item, index) => (
              <div className="reply-list-item flex" key={index}>
                <div className="left">
                  <img src={reply_item.user.avatar} alt="" />
                </div>
                <div className="right box1">
                  <h3>
                    <span>
                      {reply_item.user.username}
                      {reply_item.reply_user && (
                        <i>
                          回复 <em>@{reply_item.reply_user.username}</em>
                        </i>
                      )}
                    </span>
                    <span>{reply_item.content}</span>
                  </h3>
                  <p>
                    <span>{formatTime(reply_item.createdAt)}</span>
                    {/*<span onClick={() => this.commentLike(reply_item)}>赞  <i>25</i></span>*/}
                    <span onClick={() => this.showReply(item, reply_item)}>
                      回复
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {item.show ? (
            <CommentTpl
              className="box1"
              user={user}
              content={reply}
              placeholder={placeholder}
              changeHandle={e => this.changeHandle(e, "reply")}
              commentHandle={() => this.commentHandle(item.id, "reply", item)}
            />
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    const {
      detail,
      comments,
      text,
      like,
      all_likes,
      posterImg,
      show
    } = this.state;

    return (
      <DetailWarp className="detail-container">
        <Back
          back={() => (window.location.href = "/")}
          title={detail.title}
          right={<Login user={user} />}
        />
        {/*生成的海报*/}
        {/*<Poster />*/}
        <div id="catalog-content" />

        {show ? (
          <Overlay click={e => this.hideCanvas(e)}>
            <div className="overlay-box">
              <img
                className="posterImg"
                onClick={e => e.stopPropagation()}
                src={posterImg}
                alt=""
              />
              <div onClick={e => e.stopPropagation()} className="poster-down">
                <a href={posterImg} download="canvas生成的海报">
                  下载图片
                </a>
              </div>
            </div>
          </Overlay>
        ) : null}

        <Warp960>
          <div className="scroll-warp">
            <div className="sub_head">
              {detail.author && <span>作者: {detail.author.username}</span>}
              <span>发布时间: {formatTime(detail.createdAt)}</span>
              {detail.readNum && <span>点击数: {detail.readNum}</span>}
            </div>
            <div className="label">
              <span>标签:</span>
              {detail.tags &&
                detail.tags.map((item, index) => (
                  <Tag key={index} color="magenta">
                    {item.tag.name}
                  </Tag>
                ))}
            </div>
            <div
              id="content"
              className="detail braft-output-content"
              dangerouslySetInnerHTML={{
                __html:
                  detail.editorType === "md"
                    ? marked(detail.content)
                    : detail.content
              }}
            />
            {/*赞*/}
            <div className="like">
              <div className="anim-icon anim-icon-md heart">
                <input
                  type="checkbox"
                  checked={like}
                  onChange={this.like}
                  id="heart"
                />
                <label htmlFor="heart" />
              </div>
              <div className="like-number">{all_likes}</div>
              {/*<input value={content} onChange={this.changeHandle} placeholder="说点儿什么吧~"/>*/}
            </div>
            {/*评论 */}
            <div className="discuss">
              {this.DiscussPublish()}
              <div className="discuss-comment">
                {comments.map((item, index) => this.CommentItem(item, index))}
                <LoadMore text={text} onClick={this.getComment} />
              </div>
            </div>
            {/*分享*/}
            {/*<div className="rotate-menu">*/}
            {/*  <span className="share position" onClick={this.toggleShare}>*/}
            {/*    <i className="iconfont icon-fenxiang" />*/}
            {/*  </span>*/}
            {/*  <span*/}
            {/*    onClick={() => this.capture()}*/}
            {/*    className={cls("share1", "position", [*/}
            {/*      { active: is_click_share }*/}
            {/*    ])}*/}
            {/*  >*/}
            {/*    <Tooltip placement="top" title="生成海报">*/}
            {/*      <i className="iconfont icon-Postit" />*/}
            {/*    </Tooltip>*/}
            {/*  </span>*/}
            {/*  <span*/}
            {/*    className={cls("share2", "position", [*/}
            {/*      { active: is_click_share }*/}
            {/*    ])}*/}
            {/*  >*/}
            {/*    <Tooltip placement="top" title="微博分享">*/}
            {/*      <i className="iconfont icon-weibo" />*/}
            {/*    </Tooltip>*/}
            {/*  </span>*/}
            {/*  <span*/}
            {/*    className={cls("share3", "position", [*/}
            {/*      { active: is_click_share }*/}
            {/*    ])}*/}
            {/*  >*/}
            {/*    <Tooltip placement="top" title="微信分享">*/}
            {/*      <i className="iconfont icon-weixin" />*/}
            {/*    </Tooltip>*/}
            {/*  </span>*/}
            {/*  <span*/}
            {/*    className={cls("share4", "position", [*/}
            {/*      { active: is_click_share }*/}
            {/*    ])}*/}
            {/*  >*/}
            {/*    <Tooltip placement="top" title="QQ分享">*/}
            {/*      <i className="iconfont icon-qq" />*/}
            {/*    </Tooltip>*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
        </Warp960>
        <BackTop target={() => document.querySelector(".detail-container")} />
      </DetailWarp>
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
)(DetailComponent);
