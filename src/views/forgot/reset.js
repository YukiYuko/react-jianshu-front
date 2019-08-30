import React from "react";
import user from "../../api/user";
import "./forgot.less";
import YukiInput from "../../common/Input";
import { tips } from "../../actions";
import { getURLParams } from "../../untils";
import { SchemaModel, StringType } from "schema-typed";

const Logo = require("../../assets/images/logo.png");

const model = SchemaModel({
  code: StringType().isRequired('特殊code不能为空'),
  email: StringType().isEmail('请输入正确的邮箱').isRequired('邮箱不能空'),
  password: StringType().minLength(6, '不能少于 6 个字符').maxLength(30, '不能大于 30 个字符').isRequired('该字段不能为空'),
  confirmPassword: StringType().isRequired('该字段不能为空').addRule((value, data) => {
    return value === data.password;
  }, '两次密码不一致')
});

class ResetPassword extends React.PureComponent {
  state = {
    formData: {
      password: "",
      confirmPassword: "",
      code: "",
      email: ""
    },
    loading: false
  };

  componentDidMount() {
    this.setState({
      formData: {
        code: getURLParams()["code"]
      }
    });
  }

  reset = () => {
    const checkResult = model.check(this.state.formData);
    for (let _key in checkResult) {
      let data = checkResult[_key];
      if (data.hasError) {
        tips(data.errorMessage, "error");
        return false;
      }
    }
    user.reset(this.state.formData).then(() => {
      tips("密码修改成功!", "success");
      setTimeout(() => {
        window.location.replace("http://localhost:3000/login");
      }, 1000)
    })
  };

  change = (filed,v) => {
    this.setState({
      formData: {...this.state.formData, [filed]: v}
    })
  };

  render() {
    // 修改密码模板
    const PasswordBox = (
      <div className="forgot__box__content">
        <div className="forgot__box__form">
          <div className="forgot__box__form__item">
            <YukiInput onChange={(v) => this.change("email",v)} type="text" placeholder="请输入邮箱" />
          </div>
          <div className="forgot__box__form__item">
            <YukiInput onChange={(v) => this.change("password",v)} type="password" placeholder="请输入新密码" />
          </div>
          <div className="forgot__box__form__item">
            <YukiInput onChange={(v) => this.change("confirmPassword",v)} type="password" placeholder="请确认密码" />
          </div>
          <div className="forgot__box__form__item">
            <span className="shadow-warp" onClick={this.reset}>
              确认提交
            </span>
          </div>
        </div>
      </div>
    );

    return (
      <div className="forgot">
        <div className="forgot__head">
          <img src={Logo} alt="Yuki-雪落下的声音" />
        </div>
        <div className="forgot__box">
          <h2>找回密码</h2>
          {/*发送邮件*/}
          {PasswordBox}
        </div>
      </div>
    );
  }
}

export default ResetPassword;
