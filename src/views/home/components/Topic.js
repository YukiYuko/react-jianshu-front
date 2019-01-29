import React from "react";
import {Topic} from "../style";
import {Link} from "react-router-dom";

const topicList = [
  {
    route: "/trending/weekly",
    img: require("../../../assets/images/topic/1.png"),
  },
  {
    route: "/trending/monthly",
    img: require("../../../assets/images/topic/2.png"),
  },
  {
    route: "",
    img: require("../../../assets/images/topic/3.png"),
  },
  {
    route: "",
    img: require("../../../assets/images/topic/4.png"),
  },
  {
    route: "",
    img: require("../../../assets/images/topic/5.png"),
  }
];

const TopicComponent = () => (
  <div className="topic">
    {
      topicList.map((item, index) => (
        <Link to={item.route} key={index}>
          <Topic><img src={item.img} alt=""/></Topic>
        </Link>
      ))
    }
  </div>
);

export default TopicComponent