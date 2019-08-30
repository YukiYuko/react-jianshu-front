import React from "react";
import "./style.less";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { Empty } from "antd";
import {Sweet_confirm} from "../../../../actions";

class FollowTemplate extends React.PureComponent {

  // 取消关注
  cancel = id => {
    new Sweet_confirm({
      text: "确定不再关注该用户了吗？"
    })
      .fire()
      .then(() => {
        this.props.cancel(id);
      });
  };

  render() {
    const { list, type } = this.props;
    return (
      <div className="follow-template">
        {list.length ? (
          list.map((item, index) => (
            <div className="follow-template-card" key={index}>
              <div className="follow-template-card-head flex">
                <div className="left">
                  <img src={item.avatar} alt="" />
                </div>
                <div className="right box1">
                  <h2>{item.username}</h2>
                  <p>{item.job || "该用户还没填写职业"}</p>
                </div>
              </div>
              <div className="follow-template-card-intro">
                {item.introduce || "介绍下自己吧~"}
              </div>
              {type === 2 ? (
                <div onClick={() => this.cancel(item.id)} className="follow-template-card-liked flex items-center justify-center">
                  <i className="iconfont icon-love" />
                  <span>取消关注</span>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <Empty description={"这里什么都木有~"} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = () => ({});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FollowTemplate)
);
