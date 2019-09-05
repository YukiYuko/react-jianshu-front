import React from "react";
import Header from "../../common/Header/Header";
import { TagView, Block, BlockList } from "./style";
import Typed from "typed.js";
import { Row, Col } from "antd";
import Label from "../components/Label";
import Widget from "../components/widget";
import { bindActionCreators } from "redux";
import { set_tag_type } from "../../store/modules/public/actions";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import cls from "classnames";
import article from "../../api/article";
import LoadMore from "../../common/LoadMore";
import PicList from "./components/picList";
import PicListItem from "./components/picListItem";
import {isLogin} from "../../actions/index";

class Tag extends React.Component {

  state = {
    list: [],
    count: 0,
    page: 1,
    // 是否初始化了所有标签文章
    init: false
  };

  componentDidMount() {
    this.getData();
  }

  showTyped = (el, strings, typeSpeed = 100) => {
    return new Typed(el, {
      strings,
      typeSpeed,
      showCursor: false
    });
  };

  changeTagType = (type) => {
    this.props.set_tag_type({
      tag_type: type
    })
  };

  // 获取列表数据
  getData() {
    article.articleTagList({tagId: this.props.match.params.id, uid: this.props.user.id}).then((res) => {
      let { list, page, init } = this.state;
      this.setState({
        list: [...list, ...res.data],
        count: res.count,
        page: page + 1
      }, () => {
        // 调用子组件方法
        this.child.reset();
      });
      if (!init) {
        this.typed1 = this.showTyped(this.h, [res.tagName]);
        this.typed2 = this.showTyped(this.p, [`共 ${res.count} 篇文章`], 60);
        this.setState({
          init: true
        })
      }
    })
  }
  // 切换标签
  changeLabel = (id) => {
    this.props.history.replace(`/tag/${id}`)
  };

  // 喜欢和取消喜欢
  onLike = (index) => {
    if (isLogin(this.props)) {
      let list = [...this.state.list];
      let status = list[index].isLike ? 0 : 1;
      let params = {
        postId: list[index].id,
        uid: this.props.user.id,
        status
      };
      article.articleLike(params).then(() => {
        list[index].isLike = !list[index].isLike;
        this.setState({
          list
        });
      });
    }
  };

  // 绑定子组件实例
  onRef = (ref) => {
    this.child = ref;
  };
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.setState({
        list: [],
        count: 0,
        page: 1,
        // 是否初始化了所有标签文章
        init: false
      }, () => {
        this.typed1.destroy();
        this.typed2.destroy();
        this.getData();
      });
    }
  }

  render() {
    const {list, count, page} = this.state;
    return (
      <TagView>
        <Header />
        {/*标签块*/}
        <Block>
          <div className="block">
            <div className="block-box flex items-center justify-center dir-column">
              <div
                ref={el => {
                  this.h = el;
                }}
                className="typed-text-h"
              />
              <p
                ref={el => {
                  this.p = el;
                }}
                className="typed-text-p"
              />
            </div>
          </div>
        </Block>
        {/*列表*/}
        <BlockList>
          <div className="warp1200">
            <div className="tag-view-list">
              {/*切换展示*/}
              <div className="tag-view-list-head">
                <div className="switch-list">
                  <span className={cls({active: this.props.pub.tag_type === "pic"})} onClick={() => this.changeTagType('pic')}>
                    <i className="iconfont icon-tupianliebiao" />
                  </span>
                  <span className={cls({active: this.props.pub.tag_type === "text"})} onClick={() => this.changeTagType('text')}>
                    <i className="iconfont icon-liebiao" />
                  </span>
                </div>
              </div>
              {/*列表*/}
              <Row gutter={16}>
                <Col className="gutter-row" span={18}>
                  <LoadMore initialLoad={false} onRef={this.onRef} articles={list} count={count} page={page} getData={this.getData}>
                    <PicList>
                      {list.map((item, index) => (
                        <PicListItem onLike={this.onLike} index={index} data={item} tag_type={this.props.pub.tag_type} key={index} />
                      ))}
                    </PicList>
                  </LoadMore>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Widget title="所有标签">
                    <Label changeLabel={this.changeLabel}/>
                  </Widget>
                </Col>
              </Row>
            </div>
          </div>
        </BlockList>
      </TagView>
    );
  }
}

const mapStateToProps = state => ({
  pub: state.pub,
  user: state.user
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      set_tag_type
    },
    dispatch
  );
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Tag)
);
