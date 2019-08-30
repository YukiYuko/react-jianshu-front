import React from "react";
import article from "../../../../api/article";
import { formatTime } from "../../../../untils";

class Soup extends React.PureComponent {
  state = {
    c: "a",
    data: {}
  };
  componentDidMount() {
    this.getData();
  }

  getData() {
    article.hitokoto().then(res => {
      if (res.status === 200) {
        this.setState({
          data: res.data
        });
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="soup">
        <div className="soup__title">一言</div>
        <div className="soup__content">{data.hitokoto}</div>
        <div className="soup__from">——{data.from}</div>
        <div className="soup__author flex justify-between">
          <span>{formatTime(data.created_at * 1000)}</span>
          <span>{data.creator}</span>
        </div>
      </div>
    );
  }
}

export default Soup;
