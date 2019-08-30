import React from "react";
import "./paper.less";

class Paper extends React.PureComponent {
  render() {
    const {text = '加载更多', onClick} = this.props;
    return (
      <div className="page-btn-wrap">
        <div className="page-btn" onClick={onClick}>
          {text}
        </div>
      </div>
    );
  }
}

export default Paper;
