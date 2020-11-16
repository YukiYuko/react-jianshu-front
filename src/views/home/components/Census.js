import React from "react";
import "./Census.less";
import system from "../../../api/system";
import { formatTime } from "../../../untils";

class CensusComponent extends React.PureComponent {
  state = {
    count: {}
  };
  componentDidMount() {
    this.getCount();
  }

  getCount = async () => {
    let { data } = await system.count();
    this.setState({
      count: data
    })
  };
  render() {
    const { count } = this.state;
    return (
      <ul className="census flex wrap-wrap">
        <li>文章总数： { count.post_count } 篇</li>
        <li>草稿数目： { count.draft_count } 篇</li>
        <li>评论总数： { count.comments_count } 条</li>
        <li>标签总数： { count.label_count } 个</li>
        <li>建站时间： { count.build_time } 天</li>
        <li>注册用户： { count.user_count } 人</li>
        {/*<li>访问总量： 88058 次 </li>*/}
        <li className="w100">
          最近更新： { count.last_modify && formatTime(count.last_modify.createdAt, "YYYY-MM-DD") }
        </li>
      </ul>
    );
  }
}

export default CensusComponent;
