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
  render() {
    return (
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
        useWindow={this.props.useWindow}
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
