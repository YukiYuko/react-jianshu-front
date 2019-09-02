import React from "react";
import system from "../../../api/system";
import "./style.less";
import {withRouter} from "react-router-dom";

class Label extends React.PureComponent {

  state = {
    labels: []
  };

  componentDidMount() {
    this.getLabel();
  }

  // 获取所有标签
  getLabel() {
    system.labelList().then(res => {
      this.setState(() => ({
        labels: res.data
      }));
    });
  }
  changeLabel(id) {
    if (this.props.changeLabel) {
      this.props.changeLabel(id)
    } else {
      this.props.history.push({
        pathname: `/tag/${id}`
      })
    }
  }

  render() {
    const {labels} = this.state;
    return (
      <div className="label flex wrap-wrap">
        {labels.map((item, index) => (
          <div onClick={() => this.changeLabel(item.id)} className="label-item" key={index}>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(Label);
