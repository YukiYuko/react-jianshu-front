import React from "react";
import UserComponent from "./user";
import Logo from "../../common/Header/Logo";
import Publish from "../../common/Header/publish";
import draft from "../../api/draft";
import cls from "classnames";
import {formatTime} from "../../untils/index"
import {Popover, Popconfirm} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getStorage} from "../../untils/localstorage";

class DraftList extends React.Component {
  state = {
    list: [],
    current: {},
    total: 0
  };

  componentDidMount() {
    this.getList();
  }

  getList() {
    draft.list(getStorage("uid")).then(res => {
      this.setState({
        list: res.data.data,
        total: res.data.count
      });
    });
  }
  handleVisibleChange = (v, current) => {
    if (v) {
      this.setState({
        current
      })
    }
  };
  // 删除草稿
  del = () => {
    draft.del(this.state.current.id).then(() => {
      let list = [...this.state.list];
      let arr = list.filter((item) => item.id !== this.state.current.id);
      this.setState({
        list: arr
      })
    })
  };

  render() {
    const { list, current, total } = this.state;

    const Editor = (
      <div className="draft-edit">
        <Link to={`/write/${current.id}`}>编辑</Link>
        <Popconfirm title="删除之后无法找回，确定吗？" onConfirm={this.del} okText="确定" cancelText="取消">
          <span className="del">删除</span>
        </Popconfirm>
      </div>
    );

    return (
      <div className="write-warp draft-warp">
        <div className="write-warp__header">
          <div className="warp960 flex justify-between">
            <div className="write-warp__header__left">
              <Logo />
            </div>
            <div
              className="write-warp__header__right flex items-center"
              style={{ width: "auto" }}
            >
              <Publish />
              <UserComponent />
            </div>
          </div>
        </div>
        <div className="draft-warp__list">
          <div className="warp700">
            <div className="draft-warp__list__title">
              <span>文章草稿({total})</span>
            </div>
            <div className="draft-warp__list__body">
              {list.map((item, index) => (
                <div className="draft-warp__list__item" key={index}>
                  <h3>{item.title}</h3>
                  <p className="flex items-center">
                    <i
                      className={cls("iconfont", {
                        "icon-markdown": item.editorType === "md",
                        "icon-editorder": item.editorType === "rich"
                      })}
                    />
                    <span>
                      {formatTime(item.createdAt)}
                    </span>
                  </p>
                  <Popover placement="bottom" content={Editor} trigger="click" onVisibleChange={(v) => this.handleVisibleChange(v, item)}>
                    <i className="iconfont icon-more"/>
                  </Popover>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DraftList);
