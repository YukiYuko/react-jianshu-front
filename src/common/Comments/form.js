import React from "react";
import {tips} from "../../actions";
import {SchemaModel, StringType} from "schema-typed";
import LoadMore from "../../views/components/loadmore/paper";

const model = SchemaModel({
  nickname: StringType().isRequired("请输入昵称~"),
  email: StringType()
    .isEmail("请输入正确的邮箱~")
    .isRequired("邮箱不能为空~"),
  content: StringType().isRequired("请输入内容~"),
  link: StringType()
    .isURL("请输入正确的链接地址~")
    .isRequired("请输入内容~")
});

class CommentForm extends React.PureComponent {

  state = {
    formData: {
      nickname: "",
      content: "",
      email: "",
      link: ""
    }
  };

  changeField(key, value) {
    this.setState({
      formData: { ...this.state.formData, [key]: value }
    });
  }

  submit() {
    const checkResult = model.check(this.state.formData);
    for (let _key in checkResult) {
      let data = checkResult[_key];
      if (data.hasError) {
        tips(data.errorMessage, "error");
        return false;
      }
    }
    this.props.submit(this.state.formData);
  }

  render() {
    return (
      <div>
        <form autoComplete="off" className="v-comments__form flex justify-between wrap-wrap">
          <div className="v-comments__form-info">
            <div className="v-comments__form-field">
              <input
                id="v-comments__form-label-name"
                name="nickname"
                placeholder="昵称"
                type="text"
                onChange={e => this.changeField("nickname", e.target.value)}
                className="v-comments__form-input"
              />
              <label
                className="v-comments__form-label"
                htmlFor="v-comments__form-label-name"
              >
                <span className="v-comments__form-label-text">昵称</span>
              </label>
            </div>
            <div className="v-comments__form-field">
              <input
                id="v-comments__form-label-mail"
                name="email"
                placeholder="邮箱"
                type="text"
                onChange={e => this.changeField("email", e.target.value)}
                className="v-comments__form-input"
              />
              <label
                className="v-comments__form-label"
                htmlFor="v-comments__form-label-mail"
              >
                <span className="v-comments__form-label-text">邮箱</span>
              </label>
            </div>
            <div className="v-comments__form-field">
              <input
                id="v-comments__form-label-site"
                name="link"
                placeholder="个人博客"
                type="text"
                onChange={e => this.changeField("link", e.target.value)}
                className="v-comments__form-input"
              />
              <label
                className="v-comments__form-label"
                htmlFor="v-comments__form-label-site"
              >
                <span className="v-comments__form-label-text">个人博客</span>
              </label>
            </div>
          </div>
          <div className="v-comments__form-text">
            <div className="v-comments__form-field">
                <textarea
                  id="v-comments__form-label-text"
                  name="content"
                  placeholder="随便说点儿什么吧~"
                  type="text"
                  onChange={e => this.changeField("content", e.target.value)}
                  className="v-comments__form-input v-comments__form-textarea"
                />
              <label
                className="v-comments__form-label"
                htmlFor="v-comments__form-label-text"
              >
                  <span className="v-comments__form-label-text">
                    随便说点儿什么吧~
                  </span>
              </label>
            </div>
          </div>
        </form>
        <LoadMore
          className="v-comments__form-submit"
          text="发表留言"
          onClick={() => this.submit()}
        />
      </div>
    );
  }
}

export default CommentForm;
