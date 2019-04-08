import React from "react";
import "./style.less";
const Back = (props) => (
  <div className="back flex">
    <div onClick={props.back} className="left">
      <i className="iconfont icon-back"/>
    </div>
    <div className="center box1">
      这是标题哦
    </div>
    <div className="right"/>
  </div>
);
export default Back;
