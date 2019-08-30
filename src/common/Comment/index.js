import React from "react";
import "./style.less";
import Button from "../Button";
const Comment = ({user, content, changeHandle, commentHandle, placeholder = "说点儿什么吧~"}) => (
  <div className="public_comment flex">
    <div className="left">
      {user.id && <img src={user.avatar} alt={user.username}/>}
    </div>
    <div className="right box1">
      <div className="input-box">
        <textarea value={content} onChange={changeHandle} placeholder={placeholder}/>
      </div>
      <div className="submit-box">
        <Button type="primary" onClick={commentHandle}>评论</Button>
      </div>
    </div>
  </div>
);
export default Comment;
