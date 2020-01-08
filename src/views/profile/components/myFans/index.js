import React from "react";
import FollowTemplate from "../followTemplate/index";
import {getStorage} from "../../../../untils/localstorage";
import user from "../../../../api/user";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LoadMore from "../../../../common/LoadMore";

class MyFans extends React.PureComponent {
  state = {
    list: [],
    uid: this.props.user.id || getStorage("uid"),
    count: 0,
    page: 1
  };
  componentDidMount() {
  }

  getData = () => {
    user.following({
      aid: this.state.uid,
      type: 1,
      page: this.state.page
    }).then((res) => {
      let { list, page } = this.state;
      setTimeout(() => {
        this.setState({
          list: [...list, ...res.data.data],
          count: res.data.count,
          page: page + 1
        }, () => {
          // 调用子组件方法
          this.child.reset();
        });
      },500);
    })
  };

  // 绑定子组件实例
  onRef = (ref) => {
    this.child = ref;
  };

  render() {
    const {list, count, page} = this.state;
    return (
      <LoadMore useWindow={false} onRef={this.onRef} articles={list} count={count} page={page} getData={this.getData}>
        <FollowTemplate list={list} type={1}/>
      </LoadMore>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = () => ({});
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFans));
