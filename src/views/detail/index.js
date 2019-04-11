import React, {Component} from "react";
import {DetailWarp, Warp960} from "./style";
import Back from "../../common/Back";
import article from "../../api/article";
import { BackTop, Tag } from 'antd';
import Button from "../../common/Button";
import {connect} from "react-redux";

class DetailComponent extends Component {
  state = {
    id: "",
    detail: {}
  };
  // 获取详情
  getData = () => {
    article.articleDetail(this.state.id).then((res) => {
      this.setState({
        detail: res.data
      })
    })
  };

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    }, () => {
      this.getData();
    });
  }

  render() {
    const {history, user} = this.props;
    const {detail} = this.state;

    const DiscussPublish = () => (
      <div className="discuss-publish">
        <div className="discuss-publish-head">
          <em>377 </em>
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
              <textarea placeholder="说点儿什么吧~"></textarea>
            </div>
            <div className="submit-box">
              <Button type="primary">评论</Button>
            </div>
          </div>
        </div>
      </div>
    );
    const CommentItem = () => (
      <div className="discuss-comment-item flex">
        <div className="left">
          {/*{*/}
            {/*user.id && <img src={user.avatar} alt={user.username}/>*/}
          {/*}*/}
        </div>
        <div className="right box1">
          <h3>醉柔男儿心 <span>IT之家四川成都网友 2019-4-10 21:23:43</span></h3>
          <p>小米的自主研发能力也是很厉害</p>
          <div className="reply flex justify-between items-center">
            <div className="reply-comment">
              回复 <span>• 26条回复 <i className="iconfont icon-down"></i></span>
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
        <Back back={history.goBack} title={detail.title}/>
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

          </div>
          {/*评论 */}
          <div className="discuss">
            <DiscussPublish/>
            <div className="discuss-comment">
              <CommentItem/>
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
