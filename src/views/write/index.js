import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import "./style.less";
import UserComponent from "./user";
import { connect } from "react-redux";
import system from "../../api/system";
import PublishBtn from "../../views/components/loadmore/paper";
import { Upload, message, Spin, Icon, Tooltip } from "antd";
import {getStorage} from "../../untils/localstorage";
import * as _ from 'underscore';
import Base from "../../api/base";
import article from "../../api/article";
import draft from "../../api/draft";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import E from 'wangeditor';
import { ContentUtils } from "braft-utils";
// import { ImageUtils } from "braft-finder";
import { SchemaModel, StringType, ArrayType, NumberType } from 'schema-typed';
import {tips} from "../../actions";
import {bindActionCreators} from "redux";
import {set_user} from "../../store/modules/user/actions";
import user from "../../api/user";

const model = SchemaModel({
  title: StringType().minLength(2, '不能少于 2 个字符').maxLength(50, '不能大于 50 个字符').isRequired('标题不能为空'),
  cid: NumberType().isRequired('文章类型必选'),
  tags: ArrayType().isRequired('文章标签必选')
});

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("只能上传 jpg/png 类型的图片");
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error("图片不能大于10M");
  }
  return isJpgOrPng && isLt2M;
}

class Write extends React.Component {
  state = {
    category: [],
    labels: [],
    show_publish: false,
    show_more: false,
    show_pic: false,
    loading: false,
    saving: "",
    // 提交相关
    title: "", // 文章标题
    cid: 2, // 文章分类
    tags: [],  // 文章标签
    imageUrl: "",  // 头图
    content: "",  // md 文章内容
    editorState: BraftEditor.createEditorState(null), // rich 文章内容
    token: getStorage("token"),
    postId: "",
    editorContent: ""
  };

  constructor(props) {
    super(props);
    this.handleInputThrottled =  _.debounce(this.changeFiled, 1000);
    this.handleContentThrottled =  _.debounce(this.handleChange, 1000);
    this.handleRichThrottled =  _.debounce(this.handleRich, 1000);
  }

  componentDidMount() {
    this.setPostId();
    this.judgeLogin();
    this.getCategory();
    this.getLabels();
    if (this.props.user.editorType === "rich") {
      this.richText();
    }
  }
  richText() {
    const elem = this.editorElem;
    this.editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = html => {
      this.handleRichThrottled(html);
    };
    this.editor.customConfig.pasteFilterStyle = false;
    this.editor.customConfig.zIndex = 3;
    this.editor.create();

    window.addEventListener("click", e => {
      let _con = document.querySelector(".panel");
      if (_con) {
        if (!_con.contains(e.target)) {
          this.setState({
            show_publish: false,
            show_more: false,
            show_pic: false
          });
        }
      }
    });
  }
  // 设置id
  setPostId() {
    let postId = this.props.match.params.type;
    this.setState({
      postId
    }, () => {
      this.getDetail();
    })
  }
  // 获取详情
  getDetail() {
    if (this.state.postId && this.state.postId !== "create") {
      draft.detail(this.state.postId).then((res) => {
        this.setState({
          title: res.data.title, // 文章标题
          cid: res.data.cid, // 文章分类
          tags: [],  // 文章标签
          imageUrl: res.data.images,  // 头图
          content: res.data.content,  // md 文章内容
          editorState: BraftEditor.createEditorState(res.data.content), // rich 文章内容,
          editorContent: res.data.content
        });
        this.editor.txt.html(res.data.content);
      }).catch((res) => {
        this.props.history.replace(`/write/create`)
      })
    }
  }
  // 获取分类
  getCategory() {
    system.categoryList().then(res => {
      this.setState({
        category: res.data
      });
    });
  }
  // 获取系统已有的标签
  getLabels() {
    system.labelList().then(res => {
      this.setState({
        labels: res.data
      });
    });
  }
  // 监听标题
  changeFiled = (e) => {
    this.setState({
      title: e.target.value
    }, () => {
      this.autoSave();
    });
  };
  autoSave() {
    let id = this.props.match.params.type;
    let params = {
      title: this.state.title,
      cid: this.state.cid,
      aid: this.props.user.id,
      tags: this.state.tags,
      content: this.state.content,
      editorType: this.props.user.editorType
    };
    params.images = this.state.imageUrl;
    if (this.props.user.editorType === "md") {
      // params.content = marked(this.state.content);
      params.content = this.state.content;
    } else {
      params.content = this.state.editorContent;
    }
    this.setState({
      saving: 1
    });
    draft.create(params, id).then((res) => {
      this.setState({
        saving: 2
      });
      if (id === "create") {
        this.props.history.replace(`/write/${res.data.id}`)
      }
    }).catch(() => {
      this.setState({
        saving: ""
      });
    })
  }
  // 监听分类
  setCid = (id) => {
    this.setState({
      cid: id
    })
  };
  // 监听是否在保存为草稿
  savingText() {
    if (this.state.saving === 1) {
      return "保存中"
    } else if (this.state.saving === 2) {
      return "已保存至"
    } else {
      return "文章将自动保存至草稿"
    }
  }
  // 切换编辑器
  switchEditor = () => {
    let editorType = this.props.user.editorType === "md" ? "rich" : "md";
    user.update({editorType,id: this.props.user.id}).then(() => {
      this.props.set_user({editorType});
      this.props.history.replace("/write/create");
      window.location.reload()
    })
  };
  // 设置标签
  setTags = (id) => {
    let tags = [...this.state.tags]; // 这里是重点！！！！
    let index = tags.indexOf(id);
    if (index > -1) {
      tags.splice(index, 1)
    } else {
      if (tags.length === 3) {
        tips("标签最多选择三个哦", "error");
        return false
      }
      tags.push(id)
    }
    this.setState({
      tags
    });
  };
  judgeLogin() {
    if (!this.state.token) {
      this.props.history.push({
        pathname: "/login",
        state: {
          from:this.props.location.pathname
        }
      });
      return false;
    }
  }
  // 发布文章
  submit = () => {
    let params = {
      title: this.state.title,
      cid: this.state.cid,
      aid: this.props.user.id,
      tags: this.state.tags,
      content: this.state.content,
      editorType: this.props.user.editorType
    };
    const checkResult = model.check(params);
    for (let _key in checkResult) {
      let data = checkResult[_key];
      if (data.hasError) {
        tips(data.errorMessage, "error");
        return false;
      }
    }

    params.images = this.state.imageUrl;
    if (this.props.user.editorType === "md") {
      if (!params.content) {
        tips("请书写文章内容", "error");
        return false
      }
      params.content = this.state.content;
    } else {
      if (!this.state.editorContent) {
        tips("请书写文章内容", "error");
        return false
      }
      params.content = this.state.editorContent;
    }
    let id = this.props.match.params.type;
    if (id && id !== "create") {
      params.postId = id;
    }
    article.articleCreate(params).then(() => {
      tips("发布成功， 24小时内会给审核结果", "success");
      // this.props.history.replace("/write/create");
      window.location.href = "/write/create";
    })
  };
  // 重置内容
  // resetData() {
  //   this.setState({
  //     title: "", // 文章标题
  //     cid: "", // 文章分类
  //     tags: [],  // 文章标签
  //     imageUrl: "",  // 头图
  //     content: "",  // md 文章内容
  //     editorState: BraftEditor.createEditorState(null), // rich 文章内容
  //     show_publish: false
  //   })
  // }

  // 显示上传头图
  toggleShow = (e, filed) => {
    let data = this.state[filed];
    this.reset();
    this.setState({
      [filed]: !data
    });
    e.stopPropagation();
  };
  // 重置显示
  reset() {
    this.setState({
      show_publish: false,
      show_more: false,
      show_pic: false
    });
  }
  // 监听markdown 编辑器
  handleChange = v => {
    this.setState({
      content: v
    }, () => {
      this.autoSave()
    });
  };
  handleUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.code === 200) {
        setTimeout(() => {
          this.setState({
            loading: false,
            imageUrl: info.file.response.data.url
          });
        }, 1000);
      } else {
        message.error(info.file.response.msg);
      }
    }
  };

  handleMkUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.code === 200) {
        let {content} = this.state;
        this.setState({
          content: content + `![](${info.file.response.data.url})`
        }, () => {
          this.autoSave()
        })
      } else {
        message.error(info.file.response.msg);
      }
      this.setState({ loading: false });
    }
  };

  // 监听富文本 ****************
  handleRich = html => {
    this.setState({
      editorContent: html
    }, () => {
      this.autoSave();
    })
  };

  uploadHandler = info => {
    if (!info.file) {
      return false;
    }
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.code === 200) {
        setTimeout(() => {
          this.setState({
            loading: false,
            editorState: ContentUtils.insertMedias(this.state.editorState, [
              {
                type: "IMAGE",
                url: info.file.response.data.url
              }
            ])
          }, () => {
            this.autoSave();
          });
        }, 1000);
      } else {
        message.error(info.file.response.msg);
      }
    }
  };
  // 监听富文本 *************************

  render() {
    const { user } = this.props;
    const {
      token,
      category,
      labels,
      show_publish,
      show_more,
      show_pic,
      content,
      imageUrl,
      loading,
      tags,
      cid
    } = this.state;

    const controls = [
      "bold",
      "italic",
      "underline",
      "text-color",
      "separator",
      "link",
      "separator"
    ];
    const extendControls = [
      {
        key: "antd-uploader",
        type: "component",
        component: (
          <Upload
            name="avatar"
            className="avatar-uploader"
            showUploadList={false}
            headers={{ Authorization: token }}
            action={`${Base.server}/upload/single`}
            beforeUpload={beforeUpload}
            onChange={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        )
      }
    ];
    return (
      <Spin spinning={loading} tip="上传中，请稍候...">
        <div className="write-warp">
          <div className="write-warp__header flex">
            <div className="write-warp__header__left box1">
              <input
                placeholder="输入文章标题..."
                className="title-input"
                type="text"
                defaultValue={this.state.title}
                onChange={(e) => {e.persist();this.handleInputThrottled(e)}}
              />
            </div>
            <div className="write-warp__header__center" />
            <div className="write-warp__header__right flex items-center">
              {/*草稿*/}
              <div className="draft flex items-center">
                <span>{this.savingText()}</span>
                <span onClick={() => this.props.history.push({pathname: "/draft"})}>草稿</span>
              </div>
              {/*添加封面*/}
              <div className="pic flex items-center">
                <i
                  className="iconfont icon-tupian"
                  onClick={e => this.toggleShow(e, "show_pic")}
                />
                {show_pic ? (
                  <div className="panel">
                    <div className="pic__box">
                      <h3>添加封面大图</h3>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        headers={{ Authorization: token }}
                        action={`${Base.server}/upload/single`}
                        beforeUpload={beforeUpload}
                        onChange={this.handleUpload}
                      >
                        {imageUrl ? (
                          <div className="avatar">
                            <div
                              className="close"
                              onClick={() => this.setState({ imageUrl: "" })}
                            >
                              <i className="iconfont icon-shanchu" />
                            </div>
                            <img
                              src={imageUrl}
                              alt="avatar"
                              style={{ width: "100%" }}
                            />
                          </div>
                        ) : (
                          <button className="upload__btn">
                            点击此处添加图片
                          </button>
                        )}
                      </Upload>
                    </div>
                  </div>
                ) : null}
              </div>
              {/*切换编辑器*/}
              <div className="more flex items-center">
                <i
                  className="iconfont icon-more"
                  onClick={e => this.toggleShow(e, "show_more")}
                />
                {show_more ? (
                  <div className="panel">
                    <div className="more__box" onClick={this.switchEditor}>切换为{this.props.user.editorType === "md" ? "富文本":"markdown"}编辑器</div>
                  </div>
                ) : null}
              </div>
              {/*发布*/}
              <div className="publish flex items-center">
                <span onClick={e => this.toggleShow(e, "show_publish")}>
                  发布
                </span>
                <i className="iconfont icon-right_arrow" />
                {show_publish ? (
                  <div className="panel">
                    <div className="publish__box">
                      <h3>发布文章</h3>
                      <p>分类</p>
                      <div className="publish__box__desc flex wrap-wrap">
                        {category.map((item, index) => (
                          <span  className={cid === item.id ?"active":null} key={index} onClick={() => this.setCid(item.id)}>
                            {item.name}
                          </span>
                        ))}
                      </div>
                      <p>标签</p>
                      <div className="publish__box__desc flex wrap-wrap">
                        {labels.map((item, index) => (
                          <span  className={tags.indexOf(item.id) > -1 ? "active" : null} key={index} onClick={() => this.setTags(item.id)}>
                            {item.name}
                          </span>
                        ))}
                      </div>
                      <p>P.S.目前不支持自定义标签</p>
                      {/*<div className="publish__box__desc">*/}
                        {/*<YukiInput*/}
                          {/*onChange={v => this.change(v)}*/}
                          {/*type="text"*/}
                          {/*placeholder="您也可以自定义标签"*/}
                        {/*/>*/}
                      {/*</div>*/}
                      <PublishBtn
                        text="发布文章"
                        onClick={() => this.submit()}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              {/**/}
              <UserComponent/>
            </div>
          </div>
          {user.editorType === "md" ? (
            // markdown 编辑器
            <div className="write-warp__content flex">
              <div className="write-warp__content__left flex box1 dir-column">
                <div className="write-warp__content__body box1">
                  {/*markdown 编辑器*/}
                  <SimpleMDE
                    className="editor"
                    onChange={(v) => this.handleContentThrottled(v)}
                    value={content}
                    options={{
                      status: false
                    }}
                  />
                </div>
                <div className="write-warp__content__footer flex items-center">
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    headers={{ Authorization: token }}
                    action={`${Base.server}/upload/single`}
                    beforeUpload={beforeUpload}
                    onChange={this.handleMkUpload}
                  >
                    <Tooltip placement="topLeft" title="插入图片">
                      <i className="iconfont icon-tupian" />
                    </Tooltip>
                  </Upload>
                  <span>了解社区规范</span>
                </div>
              </div>
              <div className="write-warp__content__right flex box1 dir-column">
                <div
                className="write-warp__content__body write-warp__content__right__content box1"
                dangerouslySetInnerHTML={{ __html: marked(content) }}
                />
                <div className="write-warp__content__footer">
                  <span>预览</span>
                </div>
              </div>
            </div>
          ) : (
            // 富文本编辑器
            <div className="write-warp__content warp960">
              {/*<BraftEditor*/}
                {/*value={this.state.editorState}*/}
                {/*onChange={(v) => this.handleRichThrottled(v)}*/}
                {/*controls={controls}*/}
                {/*extendControls={extendControls}*/}
                {/*stripPastedStyles={true}*/}
                {/*stripPastedText={true}*/}
              {/*/>*/}
              <div className="editorElem" ref={(ref) => this.editorElem = ref} style={{textAlign: 'left'}}>
              </div>
            </div>
          )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Write);
