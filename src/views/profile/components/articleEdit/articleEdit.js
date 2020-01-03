import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Checkbox,
  Col,
  Icon,
  message,
  Row,
  Spin,
  Upload
} from "antd";
import Base from "../../../../api/base";
import { beforeUpload, getType } from "../../../../untils";
import YukiInput from "../../../../common/Input";
import { EffectDropdown, EffectDropdownItem } from "effect-dropdown-react";
import BraftEditor from "braft-editor";
import Vbutton from "../../../../common/Button";
import { getStorage } from "../../../../untils/localstorage";
import SimpleMDE from "react-simplemde-editor";
import article from "../../../../api/article";
import {tips} from "../../../../actions";

const placeholder = require("../../../../assets/images/placeholder.png");

class ArticleEdit extends React.Component {
  state = {
    token: getStorage("token"),
    current: this.props.current,
    tags: this.props.current.tags.map((item) => item.tagId),
    loading: false
  };
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.current.id !== nextProps.current.id) {
      this.setState({
        current: nextProps.current,
        tags: nextProps.current.tags.map((item) => item.tagId)
      });
    }
  }

  // 监听文本输入
  changeValue = v => {
    this.setState({
      current: { ...this.state.current, title: v }
    });
  };
  // 上传头图
  handleAvatarUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      if (info.file.response.code === 200) {
        setTimeout(() => {
          this.setState({
            loading: false,
            current: {
              ...this.state.current,
              images: info.file.response.data.url
            }
          });
        }, 1000);
      } else {
        message.error(info.file.response.msg);
      }
    }
  };
  // 选择分类
  chooseCategory = item => {
    this.updateCurrent("cid", item.id);
  };
  // 监听富文本 ****************
  handleRichChange = editorState => {
    this.updateCurrent("content", editorState);
  };
  // 监听markdown
  handleMdChange = (v) => {
    this.updateCurrent("content", v);
  };
  // 监听 标签
  onChangeLabel = v => {
    // console.log(v)
    // this.updateCurrent("tags", v);
    this.setState({
      tags: v
    })
  };
  // 更新state
  updateCurrent(key, value) {
    this.setState({
      current: { ...this.state.current, [key]: value }
    });
  }
  // 保存
  save = () => {
    let params = {
      id: this.state.current.id,
      title:this.state.current.title,
      content:this.state.current.content,
      tags:this.state.tags,
      aid:this.state.current.aid,
      cid:this.state.current.cid
    };
    if (getType(this.props.current.images) === "Array") {
      params.images = this.state.current.images.join(",")
    } else {
      params.images = this.state.current.images
    }
    if (this.state.current.editorType === "md") {

    } else {
      params.content = params.content.toHTML();
    }
    article.articleUpdate(params).then(() => {
      tips("更新成功, 需要重新等待管理员审核");
      this.closeEdit();
      this.props.update();
    })
  };

  // 关闭窗口
  closeEdit = () => {
    this.props.closeEdit()
  };

  render() {
    const { token, current, loading, tags } = this.state;
    const { category, labels } = this.props;
    const current_cid = this.props.category.filter(
      item => item.id === current.cid
    );
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
      <>
        <div className="article-edit">
          <div className="article-edit-item  flex items-center">
            <span className="article-edit-item-label">头图:</span>
            <div className="article-edit-item-input box1 flex items-center">
              <img
                className="avatar"
                src={current.images || placeholder}
                alt={current.title}
              />
              <div className="upload">
                <p>支持 jpg、png 格式大小 5M 以内的图片</p>
                <Upload
                  name="avatar"
                  showUploadList={false}
                  headers={{ Authorization: token }}
                  action={`${Base.server}/upload/single`}
                  beforeUpload={beforeUpload}
                  onChange={this.handleAvatarUpload}
                >
                  <Spin spinning={loading}>
                    <Button type="primary">点击上传</Button>
                  </Spin>
                </Upload>
              </div>
            </div>
          </div>
          {/*标题*/}
          <div className="article-edit-item flex items-center">
            <span className="article-edit-item-label">标题:</span>
            <div className="article-edit-item-input box1">
              <YukiInput
                value={current.title}
                onChange={v => this.changeValue(v)}
                placeholder="标题"
                showLabel={false}
              />
            </div>
          </div>
          {/*文章分类*/}
          <div className="article-edit-item flex items-center">
            <span className="article-edit-item-label">分类:</span>
            <div className="article-edit-item-input box1">
              <EffectDropdown
                // effect="camber"
                activeColor="#4d8c9d"
                label={
                  current_cid.length ? current_cid[0].name : "请选择文章分类"
                }
              >
                {category.map((item, index) => (
                  <EffectDropdownItem
                    onClick={() => this.chooseCategory(item)}
                    key={index}
                  >
                    {item.name}
                  </EffectDropdownItem>
                ))}
              </EffectDropdown>
            </div>
          </div>
          {/*文章标签*/}
          <div className="article-edit-item flex items-center">
            <span className="article-edit-item-label">标签:</span>
            <div className="article-edit-item-input box1">
              <Checkbox.Group
                // defaultValue={tags}
                value={tags}
                style={{ width: "100%" }}
                onChange={this.onChangeLabel}
              >
                <Row>
                  {labels.map((item, index) => (
                    <Col span={4} key={index}>
                      <Checkbox value={item.id}>{item.name}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>
          </div>
          {/*文章内容*/}
          <div className="article-edit-item flex items-start">
            <span className="article-edit-item-label">内容:</span>
            <div className="article-edit-item-input box1">
              {current.editorType === "rich" ? (
                <div className="md-editor">
                  <BraftEditor
                    value={BraftEditor.createEditorState(current.content)}
                    onChange={v => this.handleRichChange(v)}
                    controls={controls}
                    extendControls={extendControls}
                  />
                </div>
              ) : (
                <div className="md-editor">
                  <SimpleMDE
                    className="editor"
                    onChange={(v) => this.handleMdChange(v)}
                    value={current.content}
                    options={{
                      status: false
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="foot-btn flex justify-end">
          <Vbutton onClick={this.closeEdit} type="danger">
            取消
          </Vbutton>
          <Vbutton onClick={this.save} type="primary">
            保存
          </Vbutton>
        </div>
      </>
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
)(ArticleEdit);
