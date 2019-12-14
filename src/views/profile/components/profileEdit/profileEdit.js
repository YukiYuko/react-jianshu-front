import React from "react";
import {connect} from "react-redux";
import ProfileItem from "./profileItem";
import "./profileEdit.less";
import user from "../../../../api/user";
import {bindActionCreators} from "redux";
import {set_user} from "../../../../store/modules/user/actions";
import Base from "../../../../api/base";
import {message, Spin, Upload, Button} from "antd";
import {getStorage} from "../../../../untils/localstorage";
import {beforeUpload} from "../../../../untils/index";

class ProfileEdit extends React.Component {
  state = {
    formData: {
      avatar: "",
      username: "",
      job:  "",
      company: "",
      introduce: "",
      homepage: ""
    },
    token: getStorage("token"),
    loading: false,
    avatar: ""
  };
  save = (key, val) => {
    if (!val) {
      return;
    }
    user.update({[key]: val, id: this.props.user.id}).then(() => {
      this.props.set_user({[key]: val})
    })
  };
  handleAvatarUpload = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.code === 200) {
        setTimeout(() => {
          this.setState({
            loading: false,
            avatar: info.file.response.data.url
          });
          this.save("avatar", info.file.response.data.url)
        }, 1000);
      } else {
        message.error(info.file.response.msg);
      }
    }
  };
  render() {
    const {user} = this.props;
    const {token, loading} = this.state;
    return (
      <Spin spinning={loading} tip="上传中，请稍候...">
        <div className="profile-edit">
          <ProfileItem filed="avatar" name="头像">
            <img className="avatar" src={user.avatar} alt={user.username}/>
            <div className="profile-upload">
              <p>支持 jpg、png 格式大小 5M 以内的图片</p>
              <Upload
                name="avatar"
                showUploadList={false}
                headers={{ Authorization: token }}
                action={`${Base.server}/upload/single`}
                beforeUpload={beforeUpload}
                onChange={this.handleAvatarUpload}
              >
                <Button type="primary">
                  点击上传
                </Button>
              </Upload>
            </div>
          </ProfileItem>
          <ProfileItem save={this.save} filed="username" name="用户名" placeholder="请输入用户名" defaultValue={user.username}/>
          <ProfileItem save={this.save} filed="job"  name="职位" placeholder="请输入职位" defaultValue={user.job}/>
          <ProfileItem save={this.save} filed="company" name="公司" placeholder="请输入公司名称" defaultValue={user.company}/>
          <ProfileItem save={this.save} filed="introduce" name="个人介绍" placeholder="介绍一下自己呗" defaultValue={user.introduce}/>
          <ProfileItem save={this.save} filed="homepage"  name="个人主页" placeholder="展示一下个人技能吧" defaultValue={user.homepage}/>
        </div>
      </Spin>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    set_user
  }, dispatch)
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEdit);
