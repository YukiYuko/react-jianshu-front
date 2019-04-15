import React from "react";
import "./style.less";

class LoadMore extends React.PureComponent {
  render() {
    const {text = '加载更多', onClick} = this.props;
    return (
      <div className="loadMore-wrap" onClick={onClick}>
        <div className="loadMore">
          {text}
        </div>
      </div>
    );
  }
}

export default LoadMore;
