import React from "react";
import { connect } from "react-redux";
import {
  Badge,
  Drawer,
  Dropdown,
  Icon,
  Menu,
  Popconfirm
} from "antd";
import article from "../../../../api/article";
import { getStorage } from "../../../../untils/localstorage";
import { formatTime } from "../../../../untils";
import { tips } from "../../../../actions";
import "./style.less";
import system from "../../../../api/system";
import ArticleEdit from "../articleEdit/articleEdit";

const placeholder = require("../../../../assets/images/placeholder.png");

class MyArticle extends React.PureComponent {
  state = {
    category: [],
    labels: [],
    list: [],
    uid: getStorage("uid"),
    status: 2,
    show: false,
    token: getStorage("token"),
    current: {}
  };

  componentDidMount() {
    this.getData();
    this.getCategory();
    this.getLabels();
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
  // 获取文章列表
  getData() {
    article
      .articleList({ aid: this.state.uid, status: this.state.status })
      .then(res => {
        this.setState({
          list: res.data.data
        });
      });
  }
  // 切换文章
  chooseStatus = ({ key }) => {
    this.setState(
      {
        status: key,
        list: []
      },
      () => {
        this.getData();
      }
    );
  };
  // 删除文章
  del = id => {
    article.articleDelete({ id }).then(() => {
      tips("删除成功", "success");
      let arr = [...this.state.list];
      let list = arr.filter(item => item.id !== id);
      this.setState({
        list
      });
    });
  };
  // 打开编辑弹窗
  openEdit = current => {
    this.setState({
      show: true,
      current
    });
  };
  // 关闭弹窗
  closeEdit = () => {
    this.setState({
      show: false
    });
  };

  render() {
    const {
      list,
      status,
      show,
      current,
      category,
      labels
    } = this.state;
    const menu = (
      <Menu onClick={this.chooseStatus}>
        <Menu.Item key={2}>
          <span>已通过</span>
        </Menu.Item>
        <Menu.Item key={1}>
          <span>待审核</span>
        </Menu.Item>
        <Menu.Item key={3}>
          <span>已拒绝</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="article">
        <div className="article_title flex justify-between items-center">
          <span>发布的文章</span>
          <Dropdown overlay={menu}>
            <span className="ant-dropdown-link">
              {["", "待审核", "已通过", "已拒绝"][status]} <Icon type="down" />
            </span>
          </Dropdown>
        </div>
        <div className="article_list">
          {list.map((item, index) => (
            <div className="article_list_item v-card flex" key={index}>
              <div className="left box1 flex">
                <img className="img" src={item.images || placeholder} alt="" />
                <div className="left_mess box1">
                  <h3 className="ellipsis">{item.title}</h3>
                  <div>
                    <span>
                      标签:
                      {
                        item.tags.map((tag, index) => (
                          <i className="tag" key={index}>{tag.tag.name}</i>
                        ))
                      }
                    </span>
                  </div>
                  <div>
                    <span>时间: {formatTime(item.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="center flex items-center justify-center">
                <Badge
                  color={["", "#8799a3", "#39b54a", "#e54d42"][status]}
                  text={["", "待审核", "已通过", "已拒绝"][item.status]}
                />
              </div>
              <div className="right flex items-center justify-center">
                <span onClick={() => this.openEdit(item)}>
                  <i className="iconfont icon-bianji" />
                </span>
                <Popconfirm
                  title="确定要删除该文章吗?"
                  onConfirm={() => this.del(item.id)}
                  okText="确定"
                  cancelText="取消"
                >
                  <span>
                    <i className="iconfont icon-shanchu" />
                  </span>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
        {/*编辑*/}
        <Drawer
          width={"50%"}
          title="编辑个人资料"
          placement="right"
          closable={false}
          onClose={this.closeEdit}
          visible={show}
        >
          <ArticleEdit update={() => this.getData()} closeEdit={this.closeEdit} current={current} category={category} labels={labels} />
        </Drawer>
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
)(MyArticle);
