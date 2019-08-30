import React from "react";
import { Exchange } from "./style";

class ExchangeComponent extends React.PureComponent {
  onClickHandle() {
    let rotate = this.icon.style.transform.replace(/[^0-9]/ig, "");
    if (!rotate) {
      rotate = 360;
    } else {
      rotate = parseInt(rotate, 10) +　360;
    }
    this.icon.style.transform = `rotate(${rotate}deg)`;
    this.props.click()
  }
  render() {
    return (
      <Exchange onClick={() => this.onClickHandle()}>
        <i ref={(icon) => this.icon = icon} className="iconfont icon-huanyihuan" />
        <span>换一批</span>
      </Exchange>
    );
  }
}
export default ExchangeComponent;
