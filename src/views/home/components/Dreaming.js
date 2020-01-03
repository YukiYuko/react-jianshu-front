import React from "react";
import "./Dreaming.scss";
const Dreaming = require("../../../assets/images/dreaming.jpg");

const DreamingComponent = () => (
  <div className="dreaming">
    <h3>有梦，就不该放弃，不是吗？</h3>
    <img src={Dreaming} alt="有梦，就不该放弃，不是吗？"/>
    <p>你不去努力一下，你怎么知道努力之后的绝望呢？</p>
  </div>
);

export default DreamingComponent;
