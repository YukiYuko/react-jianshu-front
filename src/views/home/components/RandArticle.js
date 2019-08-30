import React from "react";
import {NavLink} from "react-router-dom";
import "./RandArticle.less";
import article from "../../../api/article";
import cls from "classnames";

class TopicComponent extends React.PureComponent {

  state = {
    list: []
  };

  componentDidMount() {
    this.getRandArticle();
  }

  // 获取随机文章
  getRandArticle() {
    article.articleRand().then((res) => {
      this.setState({
        list: res.data
      })
    })
  }

  render() {
    const {list} = this.state;
    const setClass = (index) => ['red', 'green', 'blue'][index];
    return (
      <div className="rand-article">
        {
          list.map((item, index) => (
            <NavLink to={`/post/${item.id}`} className="rand-article-item flex align-center" key={index}>
              <span className={cls(['num-index', setClass(index)])}>{index + 1}</span>
              <span className="box1 ellipsis">{item.title}</span>
            </NavLink>
          ))
        }
      </div>
    );
  }
}

export default TopicComponent
