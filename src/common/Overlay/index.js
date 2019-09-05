import React from "react";
import "./style.less"

const Overlay = (props) => (
  <div className="overlay" onClick={props.click}>
    {props.children}
  </div>
);

export default Overlay;
