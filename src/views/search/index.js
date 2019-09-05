import React from "react";
import article from "../../api/article";
import Header from "../../common/Header/Header";
import { Search } from "./style";
import { Col, Row, Skeleton, Empty } from "antd";
import Widget from "../components/widget";
import Lazyload from "react-lazyload";
import { formatTime, GetUrlParam } from "../../untils";
import Loading from "../../common/CssLoading";
import LoadMore from "../components/loadmore/paper";
import storage from "../../untils/storage";
import {highlight} from "../../untils/fillter";

const placeHolder = require("../../assets/images/default.png");

class SearchView extends React.Component {
  state = {
    hasMore: true,
    loading: true,
    data: [],
    total: 0,
    page: 1,
    labels: [],
    searchType: "title",
    searchVal: "",
    empty: false,
    text: "加载更多",
    history: []
  };
  componentDidMount() {
    let keyword = decodeURIComponent(GetUrlParam("keyword"));
    this.setState(
      {
        searchVal: keyword
      },
      () => {
        this.getData();
      }
    );
    this.getHistory();
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.searchVal !== nextProps.location.query.keyword) {
      this.getHistory();
      this.setState(
        {
          searchVal: nextProps.location.query.keyword
        },
        async () => {
          await this._reset();
          this.getData();
        }
      );
    }
  }

  // 加载更多
  loadMore = () => {
    let { loading, hasMore } = this.state;
    if (loading || !hasMore) {
      return false;
    }
    this.setState({
      loading: true,
      text: "加载中..."
    });
    this.getData();
  };
  // 获取列表数据
  getData = () => {
    if (!this.state.searchVal) {
      return false;
    }
    article
      .articleList({
        page: this.state.page,
        searchType: this.state.searchType,
        searchVal: this.state.searchVal
      })
      .then(res => {
        setTimeout(() => {
          let _data = [...this.state.data, ...res.data.data];
          let page = this.state.page + 1;
          this.setState(() => ({
            data: _data,
            loading: false,
            page,
            total: res.data.count,
            empty: !_data.length
          }));
          if (_data.length >= res.data.count) {
            this.setState({
              hasMore: false,
              text: "没有更多啦"
            });
            return false;
          }
        }, 1000);
      });
  };
  // 点击搜索历史
  historySearch = searchVal => {
    this.setState(
      {
        searchVal
      },
      async () => {
        await this._reset();
        this.getData();
      }
    );
  };
  // enter
  handelKeyPress = async e => {
    if (e.key === "Enter") {
      await this._reset();
      let historySearch = (await storage.get("historySearch")) || [];
      if (!historySearch.includes(this.state.searchVal)) {
        if (historySearch.length < 10) {
          historySearch.unshift(this.state.searchVal);
        } else {
          historySearch.pop();
          historySearch.unshift(this.state.searchVal);
        }
      }
      await storage.set("historySearch", historySearch);
      this.setState({
        history: historySearch
      });
      this.getData();
    }
  };
  // 每次搜索重置
  _reset = () => {
    return new Promise(resolve => {
      this.setState(
        {
          hasMore: true,
          loading: true,
          data: [],
          total: 0,
          page: 1,
          labels: [],
          searchType: "title"
        },
        () => {
          this.props.history.replace({
            pathname: "/search",
            query: {
              keyword: this.state.searchVal
            },
            search: "?keyword=" + this.state.searchVal
          });
          resolve();
        }
      );
    });
  };
  // 获取历史搜索
  getHistory = () => {
    storage.get("historySearch").then(res => {
      this.setState({
        history: res
      });
    });
  };
  // 删除历史搜索
  deleteHistory = (val, e) => {
    let arr = this.state.history.filter(item => item !== val);
    this.setState({
      history: arr
    });
    storage.set("historySearch", arr);
    e.stopPropagation();
  };
  // 绑定搜索框
  handelChange = e => {
    let val = e.target.value;
    this.setState({ searchVal: val });
  };
  // 防抖
  debounce(fn, delay) {
    let args = arguments,
      context = this,
      timer = null;

    return function() {
      if (timer) {
        clearTimeout(timer);

        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      } else {
        timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      }
    };
  }

  render() {
    const { data, empty, loading, text, searchVal, history } = this.state;
    return (
      <Search>
        <Header />
        <div className="search-head flex">
          <div className="search__container">
            <input
              className="search__input"
              type="text"
              value={searchVal}
              onChange={e => this.debounce(this.handelChange(e), 300)}
              onKeyPress={this.handelKeyPress}
              placeholder="Search"
            />
          </div>
        </div>
        <div className="warp960">
          <Row gutter={20}>
            <Col span={8}>
              <div className="search-history">
                {/*<Widget title="热门搜索">*/}
                {/*</Widget>*/}
                <Widget title="最近搜索">
                  <div className="search-latest">
                    {history.map(item => (
                      <div
                        onClick={() => this.historySearch(item)}
                        key={item}
                        className="search-latest-item flex justify-between items-center"
                      >
                        <span>{item}</span>
                        <i
                          onClick={e => this.deleteHistory(item, e)}
                          className="iconfont icon-close"
                        />
                      </div>
                    ))}
                  </div>
                </Widget>
              </div>
            </Col>
            <Col span={16}>
              {empty && <Empty />}
              {loading && <Loading key={0} />}
              <div className="search-list">
                {data.map((item, index) => (
                  <a
                    href={`/post/${item.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="search-list-item"
                    key={index}
                  >
                    {
                      <div className="search-list-item-img flex items-center hover_img">
                        <Lazyload
                          throttle={500}
                          height={300}
                          placeholder={<Skeleton active />}
                        >
                          <img src={item.images || placeHolder} alt="" />
                        </Lazyload>
                      </div>
                    }
                    <div className="search-list-item-title" dangerouslySetInnerHTML={{__html: highlight(searchVal, item.title)}}/>
                    <div className="search-list-item-desc">{item.desc}</div>
                    <div className="search-list-item-msg flex justify-between">
                      <div className="author">{item.author.username}</div>
                      <em className="line" />
                      <div className="label flex items-center">
                        <i className="iconfont icon-label" />
                        {item.tags.map((label, index) => (
                          <span key={index}>{label.tag.name}</span>
                        ))}
                      </div>
                      <em className="line" />
                      <div className="time">{formatTime(item.createdAt)}</div>
                      <em className="line" />
                      <div className="comments  flex items-center">
                        <i className="iconfont icon-liuyan" />
                        {item.comments && item.comments.length}
                      </div>
                    </div>
                  </a>
                ))}
                {!loading && !empty && (
                  <LoadMore text={text} onClick={this.loadMore} />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Search>
    );
  }
}
export default SearchView;
