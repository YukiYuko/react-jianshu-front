import React from "react";
import "./style.less";

class Widget extends React.PureComponent {
  render() {
    const {title, children} = this.props;
    return (
      <div className="widget">
        <div className="widget__title">{title}</div>
        <div className="widget__body">
          {children}
        </div>
      </div>
    );
  }
}

export default Widget;
