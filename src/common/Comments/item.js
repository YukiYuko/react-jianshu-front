import React from "react"
import {formatTime} from "../../untils";

const CommentItem = ({item, openReply}) => (
  <div className="v-comments__list__item">
    <div className="intro flex">
      <div className="left">
        <img
          src="https://secure.gravatar.com/avatar/806e52a2e2b9ff4bd2c23140df75cc1f?s=50&d=identicon&r=g"
          alt=""
        />
      </div>
      <div className="right box1">
        <h3 className="flex items-center">
          <span>{item.nickname}</span>
          <em> {item.browser} </em>
          <em> {item.os} </em>
        </h3>
        <p>{formatTime(item.createdAt)}</p>
      </div>
    </div>
    <div className="text">{item.content}</div>
    <div className="reply">
      <span onClick={() => openReply(item.id)}>回复</span>
    </div>
    {
      item.child ? <div className="child">
        {
          item.child.map((childItem, childIndex) => (
            <CommentItem item={childItem} key={childIndex} openReply={openReply}/>
          ))
        }
      </div>: null
    }
  </div>
);

export default CommentItem;
