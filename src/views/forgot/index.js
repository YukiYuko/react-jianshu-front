import React from "react";
import user from "../../api/user";
import "./forgot.less";
import YukiInput from "../../common/Input";
import { tips } from "../../actions";
// import { getUrlParams } from "../../untils";
import { SchemaModel, StringType } from "schema-typed";
import { Spin } from "antd";

const Logo = require("../../assets/images/logo.png");

const model = SchemaModel({
  email: StringType()
    .isEmail("请输入正确的邮箱")
    .isRequired("邮箱不能为空")
});

class Forgot extends React.PureComponent {
  state = {
    formData: {
      email: ""
    },
    is_ok: false,
    loading: false
  };

  componentDidMount() {}

  nextStep = () => {
    const checkResult = model.check(this.state.formData);
    for (let _key in checkResult) {
      let data = checkResult[_key];
      if (data.hasError) {
        tips(data.errorMessage, "error");
        return false;
      }
    }
    this.setState({
      loading: true
    });
    user
      .forgot({ email: this.state.formData.email })
      .then(() => {
        this.setState({
          is_ok: true,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { is_ok } = this.state;
    // 发送邮件模板
    const EmailBox = (
      <div className="forgot__box__content">
        {!is_ok ? (
          <div className="forgot__box__form">
            <div className="forgot__box__form__item">
              <YukiInput
                onKeyPress={this.nextStep}
                onChange={v => this.setState({ formData: { email: v } })}
                placeholder="请输入登录邮箱"
              />
            </div>
            <div className="forgot__box__form__item">
              <Spin spinning={this.state.loading}>
                <span
                  onClick={this.nextStep}
                  className="shadow-warp"
                >
                  下一步
                </span>
              </Spin>
            </div>
          </div>
        ) : (
          <div className="forgot__box__form">
            <div className="forgot__box__form__item flex items-center justify-center">
              <i className="iconfont icon-success" />
              邮件已发送成功!
            </div>
            {/*<div className="forgot__box__form__item">*/}
            {/*  <span className="shadow-warp">*/}
            {/*    前去确认*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
        )}
      </div>
    );
    // 修改密码模板
    // const PasswordBox = (
    //   <div className="forgot__box__content">
    //     <div className="forgot__box__form">
    //       <div className="forgot__box__form__item">
    //         <YukiInput type="password" placeholder="请输入新密码" />
    //       </div>
    //       <div className="forgot__box__form__item">
    //         <YukiInput type="password" placeholder="请确认密码" />
    //       </div>
    //       <div className="forgot__box__form__item">
    //         <span className="shadow-warp">
    //           确认提交
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // );

    return (
      <div className="forgot">
        <div className="forgot__head">
          <img src={Logo} alt="Yuki-雪落下的声音" />
        </div>
        <div className="forgot__box">
          <h2>找回密码</h2>
          {/*发送邮件*/}
          {EmailBox}
        </div>
      </div>
    );
  }
}

export default Forgot;
