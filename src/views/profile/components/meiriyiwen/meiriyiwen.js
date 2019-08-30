import React from "react";
import article from "../../../../api/article";
import { formatTime } from "../../../../untils";

class Meiriyiwen extends React.PureComponent {
  state = {
    c: "a",
    data: {}
  };
  componentDidMount() {
    this.getData();
  }

  getData() {
    article.oneDay().then(res => {
      if (res.status === 200) {
        this.setState({
          data: res.data.data
        });
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="dayArticle">
        <div className="dayArticle__title">每日一文</div>
        <div className="dayArticle__from">{data.author}</div>
        <div className="dayArticle__content" dangerouslySetInnerHTML={{__html: data.content}}/>
        <div className="dayArticle__author">
          <span>{formatTime()}</span>
        </div>
      </div>
    );
  }
}

export default Meiriyiwen;
