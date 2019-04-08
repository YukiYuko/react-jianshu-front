import React, {Component} from "react";
import {DetailWarp} from "./style";
import Back from "../../common/Back";

class DetailComponent extends Component {
  render() {
    const {history} = this.props;
    return (
      <DetailWarp>
        <Back back={history.goBack}/>
        <div className="detail">
        </div>
      </DetailWarp>
    );
  }
}

export default DetailComponent
