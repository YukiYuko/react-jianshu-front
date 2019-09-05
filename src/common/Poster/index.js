import React from "react";
import "./style.less";

const img = require("../../assets/images/poster.jpg");
class Poster extends React.PureComponent {

  render() {
    return (
      <div className="poster">
        <div className="poster-head">
          <img src={img} alt=""/>
        </div>
        <div className="poster-title">
          我在这里发现了一个好文章~
        </div>
        <div className="poster-code">
          <p>扫描下方二维码快速阅读</p>
          <div className="qr-code" id="qrcode">

          </div>
        </div>
      </div>
    );
  }
}

export default Poster;
