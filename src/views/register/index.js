import React from "react";
import {RegisterWrap} from "./style";
import YukiInput from "../../common/Input";
import YukiButton from "../../common/Button";
import {tips} from "../../actions";
import user from "../../api/user";
import { SchemaModel, StringType, DateType, NumberType } from 'schema-typed';

const model = SchemaModel({
  username: StringType().isRequired('用户名不能为空'),
  email: StringType().isEmail('请输入正确的邮箱').isRequired('邮箱不能为空'),
  password: StringType().minLength(6, '不能少于 6 个字符').maxLength(30, '不能大于 30 个字符').isRequired('该字段不能为空'),
  confirmPassword: StringType().isRequired('该字段不能为空').addRule((value, data) => {
    return value === data.password;
  }, '两次密码不一致')
});

const Logo = require("../../assets/images/logo.png");
// const BackImg = require("../../assets/images/back-top.7c489d1.png");

class Register extends React.Component {
  state = {
    formData: {
      username: "",
      password: "",
      confirmPassword: "",
      email: ""
    }
  };
  reg = () => {
    const checkResult = model.check(this.state.formData);
    for (let _key in checkResult) {
      let data = checkResult[_key];
      if (data.hasError) {
        tips(data.errorMessage, "error");
        return false;
      }
    }
    user.register(this.state.formData).then(() => {
      tips("注册成功，请登录。", "success");
      this.initData();
      this.props.close();
    })
  };
  initData() {
    this.setState({
      formData: {
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
      }
    })
  }
  componentDidMount() {

  }

  render() {
    return (
      <RegisterWrap>
        <div className="little-block"/>
        <div className="circle">
          <div className="circle-text">REGISTER</div>
          <i className="iconfont icon-down"/>
        </div>
        <div className="big-block"/>
        <div className="register flex items-center">
          <div className="register-box">
            <img className="logo" src={Logo} alt=""/>
            <div className="form">
              <div className="form-item">
                <YukiInput onChange={(v) => this.setState({formData: {...this.state.formData, username: v}})} placeholder="用户名"/>
              </div>
              <div className="form-item">
                <YukiInput onChange={(v) => this.setState({formData: {...this.state.formData, email: v}})}  placeholder="邮箱"/>
              </div>
              <div className="form-item">
                <YukiInput type="password" onChange={(v) => this.setState({formData: {...this.state.formData, password: v}})}  placeholder="密码"/>
              </div>
              <div className="form-item">
                <YukiInput type="password" onChange={(v) => this.setState({formData: {...this.state.formData, confirmPassword: v}})}  placeholder="确认密码"/>
              </div>
            </div>
            <div className="form-submit">
              <YukiButton onClick={this.reg} type="primary">SIGN IN</YukiButton>
            </div>
            <button onClick={this.props.close} className="login-btn is-active">
              LOGIN
            </button>
          </div>
        </div>
      </RegisterWrap>
    );
  }
}

export default Register;
