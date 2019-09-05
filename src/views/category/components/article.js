import React from "react";
import "./article.less";
import cls from "classnames";
import {formatTime} from "../../../untils";
import {Link} from "react-router-dom";

class Article extends React.PureComponent {
  render() {
    const {type, item} = this.props;
    const Single = () => (
      <Link target="_blank" to={`/post/${item.id}`} className="article-template single-template">
        <h3>{item.title}</h3>
        <p>
          <span>作者：{item.author && item.author.username}</span>
          <span>时间：{formatTime(item.createdAt)}</span>
          <span>分类: <em>{item.category.name}</em></span>
        </p>
        <div className="img flex justify-between">
          {
            item.images && item.images.split(",").map((img, index) => (
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
          {item.desc}
        </div>
        <div className="share flex justify-between">
          <div className="left">
            <span>
              <i className="iconfont icon-label"/>
              {
                item.tags && item.tags.map((label, index) => (
                  <em key={index}> {label.tag.name}</em>
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
      </Link>
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
