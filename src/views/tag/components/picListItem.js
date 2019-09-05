import cls from "classnames";
import {formatTime} from "../../../untils";
import React from "react";
const img = require("../../../assets/images/KyotoAnimation.jpg");
function PicListItem({tag_type, data, onLike, index}) {

  function clk (index, e) {
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    // e.nativeEvent.stopImmediatePropagation();
    onLike && onLike(index, e);
  }

  return (
    <div onClick={() => window.open(`/post/${data.id}`)} className={cls("pic-list-item",[
      {"pic-list-item-text": tag_type === "text"}
    ])}>
      <div className="pic-list-item-box">
        <div className="img-box">
          <img className="img" src={data.images || img} alt="" />
        </div>
        <div className="text">
          <img className="avatar" src={data.avatar} alt="" />
          <div className="text-box">
            <h3>{data.title}</h3>
            <p>
              <span>作者: {data.createBy}</span>
              <span>时间: {formatTime(data.createdAt)}</span>
            </p>
            <div className="tag">
              {
                data.tags.map((item, index) => (
                  <span key={index}>{item.name}</span>
                ))
              }
            </div>
            <div onClick={(e) => clk(index, e)} className={cls("like flex items-center justify-center", {
              active: data.isLike
            })}>
              <i className="iconfont icon-love" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PicListItem;
