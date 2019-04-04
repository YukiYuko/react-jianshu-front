import React from "react"
import "./style.less"

const Loading = () => (
  <div className="loading-view">
    <div className="authent">
      <img src={require("./puff.svg")} alt=""/>
      <p>认证中...</p>
    </div>
  </div>
);

export default Loading;
