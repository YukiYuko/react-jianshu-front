import React from "react";
import "./style.less";
const Back = (props) => (
  <div className="back flex">
    <div onClick={props.back} className="left">
      <i className="iconfont icon-back"/>
    </div>
    <div className="center box1">
      {props.title}
    </div>
    <div className="right">
      {props.right}
    </div>
  </div>
);
export default Back;
