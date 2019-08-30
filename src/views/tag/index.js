import React from "react";
import Header from "../../common/Header/Header";
import {Block} from "./style";
import Typed from "typed.js";

class Tag extends React.PureComponent {
  componentDidMount() {
    this.showTyped(this.h, ["Node"]);
    this.showTyped(this.p, ["共 25 篇文章"], 60);
  }
  showTyped = (el,strings, typeSpeed = 100) => {
    new Typed(el, {
      strings,
      typeSpeed,
      showCursor: false
    });
  };

  render() {
    return (
      <div className="tag-view">
        <Header />
        {/*标签块*/}
        <Block>
          <div className="block">
            <div className="block-box flex items-center justify-center dir-column">
              <h3 ref={(el) => { this.h = el; }} className="typed-text-h"/>
              <p ref={(el) => { this.p = el; }} className="typed-text-p"/>
            </div>
          </div>
        </Block>
      </div>
    );
  }
}

export default Tag;
