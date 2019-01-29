import React, {Component} from "react";
import WarpIndex from "../../common/WarpIndex";
import {Trending} from "./style";
class TrendingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headImage: require("../../assets/images/topic/seven-hot.png")
    }
  }
  componentDidMount() {
    if (this.props.match.params.type === "weekly") {
      this.setState({
        headImage: require("../../assets/images/topic/seven-hot.png")
      });
    } else {
      this.setState({
        headImage: require("../../assets/images/topic/thirty-hot.png")
      });
    }
  }

  render() {
    const {headImage} = this.state;
    return (
      <WarpIndex>
        <Trending className="trending">
          <div className="trending-head">
            <img src={headImage} alt=""/>
          </div>
        </Trending>
      </WarpIndex>
    );
  }
}
export default TrendingComponent;