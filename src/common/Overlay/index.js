import React from "react";
import "./style.less"

const Overlay = (props) => (
  <div className="overlay" onClick={props.click}/>
);

export default Overlay;
