import React from "react";
import FollowTemplate from "../followTemplate/index";
import {getStorage} from "../../../../untils/localstorage";
import user from "../../../../api/user";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LoadMore from "../../../../common/LoadMore";
import {successModal} from "../../../../actions";

class MyFollowing extends React.PureComponent {
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
      type: 2,
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
  // 取消关注
  cancel = (id) => {
    let params = {
      postId: id,
      uid: this.state.uid,
      status: 2
    };
    user.follow(params).then(() => {
      successModal("取消关注成功");
      let arr = [...this.state.list];
      let list = arr.filter(item => item.id !== id);
      this.setState({
        list
      });
    });
  };
  // 绑定子组件实例
  onRef = (ref) => {
    this.child = ref;
  };

  render() {
    const {list, count, page} = this.state;
    return (
      <LoadMore useWindow={false} onRef={this.onRef} articles={list} count={count} page={page} getData={this.getData}>
        <FollowTemplate list={list} type={2} cancel={this.cancel}/>
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
)(MyFollowing));
