import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {Spin} from "antd";

class LoadMore extends React.PureComponent {
  state = {
    loading: false,
    hasMore: true
  };
  componentDidMount() {
    this.props.onRef(this);
  }

  handleInfiniteOnLoad = () => {
    let { articles, count, page } = this.props;
    this.setState({
      loading: true
    });
    if (page!==1) {
      if (count === articles.length) {
        // message.warning('没有更多啦');
        this.setState({
          hasMore: false,
          loading: false,
        });
        return false;
      }
    }
    this.props.getData();
  };
  reset = () => {
    this.setState({
      loading: false
    })
  };
  _init = () => {
    this.setState({
      loading: false,
      hasMore: true
    })
  };
  render() {
    const {initialLoad = true} = this.props;
    return (
      // 给这个加个key 是为了切换的时候保持最新的page
      <InfiniteScroll
        initialLoad={initialLoad}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
        useWindow={this.props.useWindow}
        threshold={50}
        style={{width: "100%"}}
        key={this.props.random}
      >
        {this.props.children}
        {this.state.loading && this.state.hasMore && (
          <div style={{textAlign: "center"}} className="demo-loading-container">
            <Spin />
          </div>
        )}
      </InfiniteScroll>
    );
  }
}

export default LoadMore;
