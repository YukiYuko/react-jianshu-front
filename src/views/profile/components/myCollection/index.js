import React from "react";
import {Empty} from "antd";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import user from "../../../../api/user";
import {getStorage} from "../../../../untils/localstorage";
import "./style.less";
import {formatTime} from "../../../../untils";
import {Sweet_confirm, successModal} from "../../../../actions";
import article from "../../../../api/article";
import LoadMore from "../../../../common/LoadMore";

class MyCollection extends React.PureComponent {
  state = {
    uid: this.props.user.id || getStorage("uid"),
    list: [],
    count: 0,
    page: 1
  };

  componentDidMount() {
  }

  getData = () => {
    user.getCollection({
      uid: this.state.uid,
      page: this.state.page
    }).then(res => {
      let {list, page} = this.state;
      setTimeout(() => {
        this.setState({
          list: [...list, ...res.data.data],
          count: res.data.count,
          page: page + 1
        }, () => {
          // 调用子组件方法
          this.child.reset();
        });
      }, 500);
    });
  };

  // 取消收藏
  cancel = (e, id) => {
    e.preventDefault();
    new Sweet_confirm({
      text: "确定要将该文章从收藏中取消吗(╥╯^╰╥)"
    })
      .fire()
      .then(() => {
        let params = {
          postId: id,
          uid: this.state.uid,
          status: 2
        };
        article.articleLike(params).then(() => {
          successModal("取消收藏成功");
          let arr = [...this.state.list];
          let list = arr.filter(item => item.id !== id);
          this.setState({
            list
          });
        });
      });
  };

  render() {
    const {list, count, page} = this.state;
    return (
      <LoadMore useWindow={false} articles={list}
                onRef={(ref) => this.child = ref}
                count={count} page={page} getData={this.getData}>
        <div className="my-collection">
          <div className="my-collection-post">
          {list.length ? (
            list.map((item, index) => (
              <Link target="_blank" to={`/post/${item.id}`} className="my-collection-post-item" key={index}>
                <div className="my-collection-post-item-head flex ">
                  <div className="left">
                    <img src={item.images} alt=""/>
                  </div>
                  <div className="right box1">
                    <h2>{item.title}</h2>
                    <p className="flex justify-between">
                      <span>by~ {item.createBy}</span>
                      <span>{formatTime(item.createdAt)}</span>
                    </p>
                  </div>
                </div>
                <div
                  onClick={(e) => this.cancel(e, item.id)}
                  className="my-collection-post-item-btn"
                >
                  <i className="iconfont icon-love"/>
                  <span>取消收藏</span>
                </div>
              </Link>
            ))
          ) : (
            <Empty
              description={"这里什么都木有~"}
            >
            </Empty>
          )}
        </div>
        </div>
      </LoadMore>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = () => ({});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyCollection)
);
