import React from "react";
import PropTypes from "prop-types";
import { tips } from "../../../../actions";
class ProfileItem extends React.PureComponent {
  state = {
    value: "",
    editing: false
  };
  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  edit = (v) => {
    this.setState({
      editing: v
    });
  };
  onBlur = () => {
    this.edit(false);
    this.save();
  };
  save = () => {
    if (this.props.filed === "username") {
      if (!this.state.value.trim()) {
        tips("用户名不能为空哦~", "error");
        return false;
      }
    }
    this.props.save(this.props.filed, this.state.value);
    this.edit(false);
  };

  render() {
    const { name, placeholder, defaultValue, filed } = this.props;
    const { editing } = this.state;
    return (
      <div className="profile-edit-item flex items-center">
        <div className="left">{name}</div>
        <div className="right flex items-center box1">
          {
            this.props.children ? this.props.children : (
              <>
                <input
                  defaultValue={defaultValue}
                  name={filed}
                  onChange={this.onChange}
                  type="text"
                  className="box1"
                  onFocus={() => this.edit(true)}
                  onBlur={this.onBlur}
                  placeholder={placeholder}
                />
                <div className="edit-btn flex items-center">
                  {editing ? (
                    <div className="edit-btn-isClick">
                      <span onClick={() => this.save()}>
                        保存
                      </span>
                      <span
                        onClick={() => this.edit(false)}
                      >
                        取消
                      </span>
                    </div>
                  ) : (
                    <div className="edit-btn-click" onClick={() => this.edit(true)}>
                      <i className="iconfont icon-bianji" />
                      <span>编辑</span>
                    </div>
                  )}
                </div>
              </>
            )
          }
        </div>
      </div>
    );
  }
}
ProfileItem.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  filed: PropTypes.string
};
ProfileItem.defaultProps = {
  placeholder: "请填写该字段"
};
export default ProfileItem;
