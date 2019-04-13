import React from "react";
import Header from "../../common/Header/Header";
import {Category} from "./style";
import {getImg} from "../../api/other";
import ArticleItem from "./components/article";
import {Row, Col, message, BackTop} from "antd";
import Widget from "../components/widget";
import InfiniteScroll from 'react-infinite-scroller';
import article from "../../api/article";
import Loading from "../../common/CssLoading";

class CategoryCom extends React.Component{
  state = {
    bg: "",
    hasMore: true,
    loading: true,
    data: [],
    total: 0,
    page: 1
  };
  componentDidMount() {
    // console.log(this.props.match.params.type)
    // this._getImg();
    this.getData();
  }
  // 获取背景
  _getImg = () => {
    getImg().then((res) => {
      if (res.status.code === 200) {
        this.setState({
          bg: res.data.url
        })
      }
    })
  };
  // 加载更多
  loadMore = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    console.log(data.length, this.state.total)
    if (data.length >= this.state.total) {
      message.warning('没有更多啦');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return false;
    }
    this.getData(data);
  };
  getData = () => {
    let cid = this.props.match.params.type;
    article.articleList({page: this.state.page, cid}).then((res) => {
      setTimeout(() => {
        let _data = [...this.state.data, ...res.data.data];
        let page = this.state.page + 1;
        this.setState(() => ({
          data: _data,
          loading: false,
          page,
          total: res.data.count
        }));
      }, 1000);
    })
  };

  render() {
    const {bg, data, loading, hasMore} = this.state;
    return (
      <Category>
        <Header/>
        <div className="category-head">
          <img src={bg} alt=""/>
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
                  {
                    data.map((item, index) => (
                      <ArticleItem item={item} key={index}/>
                    ))
                  }
                </InfiniteScroll>
                {
                  loading && hasMore && (<Loading key={0}/>)
                }
              </div>
            </Col>
            <Col span={8}>
              <div className="category-side">
                <Widget title="推荐文章">
                </Widget>
              </div>
            </Col>
          </Row>
        </div>
        <BackTop/>
      </Category>
    );
  }
}

export default CategoryCom;
