import React from "react";
import { Topic } from "../style";
const topicList = [
  require("../../../assets/images/topic/1.png"),
  require("../../../assets/images/topic/2.png"),
  require("../../../assets/images/topic/3.png"),
  require("../../../assets/images/topic/4.png"),
  require("../../../assets/images/topic/5.png"),
];

const TopicComponent = () => (
    <div className="topic">
        {
            topicList.map((item, index) => (
                <Topic herf="/" key={index}><img src={item} alt=""/></Topic>
            ))
        }
    </div>
);

export default TopicComponent