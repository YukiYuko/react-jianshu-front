import React from "react";
import "./paper.less";

class Paper extends React.PureComponent {
  render() {
    const {text = '加载更多', onClick} = this.props;
    return (
      <div className="page-btn-wrap" onClick={onClick}>
        <div className="page-btn">
          {text}
        </div>
      </div>
    );
  }
}

export default Paper;
