import React from "react";
import Header from "../../common/Header/Header";
import { Category } from "./style";
import { getImg } from "../../api/other";
import ArticleItem from "./components/article";
import { Row, Col, BackTop } from "antd";
import Widget from "../components/widget";
import InfiniteScroll from "react-infinite-scroller";
import article from "../../api/article";
import system from "../../api/system";
import Loading from "../../common/CssLoading";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { set_cate } from "../../store/modules/public/actions";
import {connect} from "react-redux";

class CategoryCom extends React.Component {
  state = {
    bg: "",
    hasMore: true,
    loading: true,
    data: [],
    total: 0,
    page: 1,
    labels: [],
    one: {}
  };
  componentDidMount() {
    this._getImg();
    // this.getData();
    this.getLabel();
    this.getOneDay();
  }
  // 获取背景
  _getImg = () => {
    getImg().then(res => {
      if (res.status.code === 200) {
        this.setState({
          bg: res.data.url
        });
      }
    });
  };
  // 加载更多
  loadMore = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    if (data.length >= this.state.total) {
      this.setState({
        hasMore: false,
        loading: false
      });
      return false;
    }
    this.getData(data);
  };
  getData = () => {
    article
      .articleList({ page: this.state.page, cid: this.props.pub.cate })
      .then(res => {
        setTimeout(() => {
          let _data = [...this.state.data, ...res.data.data];
          let page = this.state.page + 1;
          this.setState(() => ({
            data: _data,
            loading: false,
            page,
            total: res.data.count
          }));
        }, 500);
      });
  };
  componentWillReceiveProps(newProps, nextState) {
    console.log("this.props.match.params.type", this.props.match.params.type);
    console.log("newProps.type", newProps.type);
    if (this.props.match.params.type !== newProps.type) {
      this.setState({
        cid: newProps.type,
        hasMore: true,
        loading: true,
        data: [],
        total: 0,
        page: 1,
      }, () => {
        this.getData();
      })
    }
  }
  // 获取所有标签
  getLabel() {
    system.labelList().then(res => {
      this.setState(() => ({
        labels: res.data
      }));
    });
  }
  // oneDay
  getOneDay() {
    article.oneDay().then(res => {
      this.setState(() => ({
        one: res.data.data
      }));
    });
  }
  render() {
    const { bg, data, loading, hasMore, labels, one } = this.state;
    return (
      <Category>
        <Header />
        <div className="category-head">
          <img src={bg} alt="" />
        </div>
        <div className="warp960">
          <Row gutter={20}>
            <Col span={16}>
              <div className="category-body">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.loadMore}
                  hasMore={!loading && hasMore}
                  threshold={200}
                >
                  {data.map((item, index) => (
                    <ArticleItem item={item} key={index} />
                  ))}
                </InfiniteScroll>
                {loading && hasMore && <Loading key={0} />}
              </div>
            </Col>
            <Col span={8}>
              <div className="category-side">
                <Widget title="每日一文">
                  <div className="one">
                    <div className="one-title">{one.title}</div>
                    <div className="one-author">{one.author}</div>
                    <div className="one-digest">
                      {one.digest}...
                      <a
                        href="https://meiriyiwen.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        查看全文
                      </a>
                    </div>
                    <div className="one-date" />
                  </div>
                </Widget>
                {/*<Widget title="推荐文章" />*/}
                <Widget title="所有标签">
                  <div className="label flex wrap-wrap">
                    {labels.map((item, index) => (
                      <div className="label-item" key={index}>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </Widget>
              </div>
            </Col>
          </Row>
        </div>
        <BackTop />
      </Category>
    );
  }
}

const mapStateToProps = state => ({
  pub: state.pub
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      set_cate
    },
    dispatch
  );
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryCom)
);
