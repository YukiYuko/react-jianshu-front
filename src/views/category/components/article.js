import React from "react";
import "./article.less";
import cls from "classnames";
import PropTypes from "prop-types";

class Article extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const {type, item} = this.props;
    const {router} = this.context;
    const Single = () => (
      <div className="article-template single-template" onClick={() => router.history.push(`/post/${item.id}`)}>
        <h3>{item.title}</h3>
        <p>
          <span>作者：{item.author && item.author.username}</span>
          <span>时间：{item.createdAt}</span>
          <span>分类: <em>{item.category.name}</em></span>
        </p>
        <div className="img flex justify-between">
          {
            item.images && item.images.map((img, index) => (
              <div key={index} className={cls('hover_img', [
                {'width30': item.images.length === 3},
                {'width48': item.images.length === 2},
                {'width100': item.images.length === 1},
              ])}>
                <img src={img} alt=""/>
              </div>
            ))
          }
        </div>
        <div className="desc">
          技术进步对于设计师的影响到底有多大的影响？对于这个创意和创造力是核心竞争力的行业当中，不同的设计师对于技术发展的影响，看法不同。
        </div>
        <div className="share flex justify-between">
          <div className="left">
            <span>
              <i className="iconfont icon-label"/>
              {
                item.label && item.label.map((label, index) => (
                  <em key={index}> {label}</em>
                ))
              }
            </span>
          </div>
          <div className="right">
            <span>
              <i className="iconfont icon-dianzan"/>
              <em> {item.likes.length}</em>
            </span>
            <span>
              <i className="iconfont icon-liuyan"/>
              <em> {item.comments.length}</em>
            </span>
          </div>
        </div>
      </div>
    );
    const Muti = () => (
      <div className="muti-template">
        这是多图模板
      </div>
    );
    const Text = () => (
      <div className="text-template">
        这是文字模板
      </div>
    );
    if (type === "single" || !type) {
      return <Single/>
    }
    if (type === "mut") {
      return <Muti/>
    }
    if (type === "mut") {
      return <Text/>
    }
  }
}

export default Article;
