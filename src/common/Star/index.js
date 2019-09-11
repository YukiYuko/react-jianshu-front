import React from "react";
import "./style.less";

class Star extends React.PureComponent {
  render() {
    return (
      <div className="rate-content">
        <input type="radio" name="rate" />
        <input type="radio" name="rate" />
        <input type="radio" name="rate" />
        <input type="radio" name="rate" />
        <input type="radio" name="rate" />
      </div>
    );
  }
}

export default Star;
