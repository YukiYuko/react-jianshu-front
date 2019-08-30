import React from "react";
import "./Census.less";
class CensusComponent extends React.PureComponent {
  render() {
    return (
      <ul className="census flex wrap-wrap">
        <li>文章总数： 216 篇</li>
        <li>草稿数目： 3 篇</li>
        <li>分类数目： 14 个</li>
        <li>独立页面： 6 个</li>
        <li>评论总数： 848 条</li>
        <li>链接总数： 13 个</li>
        <li>标签总数： 403 个</li>
        <li>建站时间： 936 天</li>
        <li>注册用户： 1159 人</li>
        <li>访问总量： 88058 次 </li>
        <li>最近更新： 2019.7.8 </li>
      </ul>
    );
  }
}

export default CensusComponent;
