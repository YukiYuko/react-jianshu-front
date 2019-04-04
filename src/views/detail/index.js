import React, {Component} from "react";
import {DetailWarp} from "./style";
import Header from "../../common/Header/Header";

class DetailComponent extends Component {
  render() {
    return (
      <div className="post">
        <Header/>
        <DetailWarp>
          detail
        </DetailWarp>
      </div>
    );
  }
}

export default DetailComponent