import React, {Component} from "react";
import {DetailWarp, Warp960} from "./style";
import Back from "../../common/Back";
import article from "../../api/article";
import { BackTop, Tag } from 'antd';
import Button from "../../common/Button";
import {connect} from "react-redux";
import comment from "../../api/comment";
import {tips} from "../../actions";
import Login from "../../common/Header/Login";
import LoadMore from "../components/loadmore";

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
    like: false
  };
  // 点赞
  like = () => {
    this.setState((prev) => ({
      like: !prev.like
    }), () => {
      let status = this.state.like ? 1 : 0;
      let params = {
        postId: this.state.id,
        uid: this.props.user.id,
        status
      };
      article.articleLike(params).then((res) => {
        console.log(res)
      })
    });
  };
  // 获取评论列表
  getComment = () => {
    let {comments, total, loading} = this.state;
    if (loading) {
      return false
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
    comment.commentList({postId: this.state.id, page: this.state.page}).then((res) => {
      setTimeout(() => {
        let comments = [...this.state.comments, ...res.data.data];
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
      }, 1000);
    })
  };
  // 获取详情
  getData = () => {
    article.articleDetail(this.state.id).then((res) => {
      this.setState({
        detail: res.data
      })
    })
  };
  // 评论
  commentHandle = () => {
    let params = {
      postId: this.state.id,
      uid: this.props.user.id,
      content: this.state.content
    };
    if (this.state.content.match(/^\s*$/)) {
      tips("请输入点儿东西吧~","error");
      return false;
    }
    comment.commentCreate(params).then((res) => {
      let data = {...res.data, user: this.props.user};
      let comments = [data,...this.state.comments];
      let total = this.state.total + 1;
      this.setState({
        comments,
        content: "",
        total
      })
    })
  };
  // 绑定输入值
  changeHandle = (e) => {
    let v = e.target.value;
    this.setState({
      content: v
    })
  };
  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    }, () => {
      this.getData();
      this._getComment();
    });
  }

  render() {
    const {history, user} = this.props;
    const {detail, content, comments, total, text, like} = this.state;

    const DiscussPublish = (
      <div className="discuss-publish">
        <div className="discuss-publish-head">
          <em>{total} </em>
          条评论
        </div>
        <div className="discuss-publish-body flex">
          <div className="left">
            {
              user.id && <img src={user.avatar} alt={user.username}/>
            }
          </div>
          <div className="right box1">
            <div className="input-box">
              <textarea value={content} onChange={this.changeHandle} placeholder="说点儿什么吧~"/>
            </div>
            <div className="submit-box">
              <Button type="primary" onClick={this.commentHandle}>评论</Button>
            </div>
          </div>
        </div>
      </div>
    );
    const CommentItem = ({item}) => (
      <div className="discuss-comment-item flex">
        <div className="left">
          <img src={item.user.avatar} alt={item.user.username}/>
        </div>
        <div className="right box1">
          <h3>{item.user.username} <span>IT之家四川成都网友 {item.createdAt}</span></h3>
          <p>{item.content}</p>
          <div className="reply flex justify-between items-center">
            <div className="reply-comment">
              回复 <span>• 26条回复 <i className="iconfont icon-down"/></span>
            </div>
            <div className="reply-box">
              <div className="heart">
                <i className="iconfont icon-dianzan"/>
                <span> 26</span>
              </div>
            </div>
          </div>
          {/*是否展开评论*/}
          {/*<DiscussPublish/>*/}
        </div>
      </div>
    );

    return (
      <DetailWarp>
        <Back back={history.goBack} title={detail.title} right={<Login user={user}/>}/>
        <Warp960>
          <div className="sub_head">
            {
              detail.author && <span>作者: {detail.author.username}</span>
            }
            <span>发布时间: {detail.createdAt}</span>
            {
              detail.readNum && <span>点击数: {detail.readNum}</span>
            }
          </div>
          <div className="label">
            <span>标签:</span>
            {
              detail.label && detail.label.split(",").map((item, index) => (
                <Tag key={index} color="magenta">{item}</Tag>
              ))
            }
          </div>
          <div className="detail" dangerouslySetInnerHTML={{__html: detail.content}}>
          </div>
          {/*赞*/}
          <div className="like">
            <div className="anim-icon anim-icon-md heart">
              <input type="checkbox" checked={like} onChange={this.like} id="heart"/>
              <label htmlFor="heart"/>
            </div>
            <div className="like-number">123</div>
            {/*<input value={content} onChange={this.changeHandle} placeholder="说点儿什么吧~"/>*/}
          </div>
          {/*评论 */}
          <div className="discuss">
            {
              DiscussPublish
            }
            <div className="discuss-comment">
              {
                comments.map((item, index) => (
                  <CommentItem key={index} item={item}/>
                ))
              }
              <LoadMore text={text} onClick={this.getComment}/>
            </div>
          </div>
        </Warp960>
        <BackTop/>
        {/*分享*/}
        <div className="rotate-menu">
          <a className="share">
            <i className="iconfont icon-fenxiang"/>
          </a>
          <a className="share1">
            <i className="iconfont icon-twitter"/>
          </a>
          <a className="share2">
            <i className="iconfont icon-weibo"/>
          </a>
          <a className="share3">
            <i className="iconfont icon-weixin"/>
          </a>
          <a className="share4">
            <i className="iconfont icon-qq"/>
          </a>
        </div>
      </DetailWarp>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user
});
const mapDispatchToProps = () => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(DetailComponent);
