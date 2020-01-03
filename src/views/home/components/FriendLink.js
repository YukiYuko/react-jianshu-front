import React from "react";
import {Link} from "react-router-dom";
import system from "../../../api/system";
import "./FriendLink.less";
import Img from "../../../common/Img/index";

class FriendLinkComponent extends React.PureComponent {
  state = {
    list: []
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    system.LinkList({limit: 5}).then(res => {
      this.setState({
        list: res.data
      });
    });
  }

  errHandle(item) {
    item.image = "error.jpg";
    item.avatar = "error.jpg"
  }

  render() {
    const {list} = this.state;
    return (
      <div className="friend-link">
        {list.map((item, index) => (
          <a
            href={item.url}
            target="_blank"
            className="friend-link-item flex"
            rel="noopener noreferrer"
            key={index}
          >
            <div className="left">
              <Img defaultImg={require("../../../assets/images/headImage.png")} imageUrl={item.image || item.avatar}
                   alt={item.title}/>
            </div>
            <div className="right box1">
              <h3>{item.title}</h3>
              <p className="ellipsis">{item.description}</p>
            </div>
          </a>
        ))}
        <Link className="more" to="/message" target="_blank">
          更多
        </Link>
      </div>
    );
  }
}

export default FriendLinkComponent;
