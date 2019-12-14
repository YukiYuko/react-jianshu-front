import React, {Component} from "react";
import {connect} from "react-redux";
import cls from "classnames";
import "./follow.less"
import {getStorage} from "../../../../untils/localstorage";
import {Route, withRouter} from "react-router-dom";
import MyFollowing from "../myFollowing/index";
import MyFans from "../myFans/index";
import MyCollection from "../myCollection/index";

class AboutMember extends Component {
  state = {
    tab: this.props.match.params.type || "following",
    uid: this.props.user.id || getStorage("uid")
  };

  componentDidMount() {
  }

  changeTab = async (tab) => {
    this.setState({
      tab
    });
    this.props.history.push({
      pathname: tab
    })
  };
  render() {
    const {tab} = this.state;
    return (
      <div className="following">
        <section id="wrapper">
          <div className="content">
            <div className="tabs">
              <button onClick={() => this.changeTab("following")} className={cls("tablinks",{"active": tab === "following"})} data-country="关注">
                <p data-title="关注">关注</p>
              </button>
              <button onClick={() => this.changeTab("fans")} className={cls("tablinks",{"active": tab === "fans"})} data-country="粉丝">
                <p data-title="粉丝">粉丝</p>
              </button>
              <button onClick={() => this.changeTab("collection")} className={cls("tablinks",{"active": tab === "collection"})} data-country="收藏">
                <p data-title="收藏">收藏</p>
              </button>
              <button onClick={() => this.changeTab("more")} className={cls("tablinks",{"active": tab === "more"})} data-country="more">
                <p data-title="more">more</p>
              </button>
            </div>

            <div className="wrapper_tabcontent">
              <div id="following" className={cls("tabcontent",{"active": tab === "following"})}>
                <h3>follow</h3>
                <div className="tab-content">
                  <Route path={`/profile/following`} component={MyFollowing} />
                </div>
              </div>

              <div id="fans" className={cls("tabcontent",{"active": tab === "fans"})}>
                <h3>fans</h3>
                <div className="tab-content">
                  <Route path={`/profile/fans`} component={MyFans} />
                </div>
              </div>

              <div id="collection" className={cls("tabcontent",{"active": tab === "collection"})}>
                <h3>collection</h3>
                <div className="tab-content">
                  <Route path={`/profile/collection`} component={MyCollection} />
                </div>
              </div>

              <div id="more" className={cls("tabcontent",{"active": tab === "more"})}>
                <h3>more</h3>
                <div className="tab-content">
                  暂无更多功能
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
)(AboutMember));
