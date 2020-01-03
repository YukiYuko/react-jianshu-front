import React, {Component} from "react";
import {InputBox, Nav} from "./style";
import {connect} from "react-redux";
import {get_hot_list} from "../../store/modules/article/actions";
// import { CSSTransition } from 'react-transition-group';
import system from "../../api/system";
import classNames from "classnames";
import {NavLink, withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {set_cate} from "../../store/modules/public/actions";
import SearchInput from "../../common/SearchInput";

class NavComponent extends Component {
  constructor(props) {
    super(props);
    this.changeHot = this.changeHot.bind(this);
    this.changeState = this.changeState.bind(this);
    this.changeMouse = this.changeMouse.bind(this);
    this.state = {
      index: 0,
      focused: false,
      mouseIn: false,
      menu: [],
      cid: ""
    };
  }
  // 改变状态
  changeState (status) {
    this.setState({
      focused: status
    })
  }
  changeMouse (status) {
    this.setState(() => ({mouseIn: status}))
  }
  // 改变热门
  changeHot() {
    const {hotList} = this.props.article;
    let totalPage = Math.ceil(hotList.length / 10);
    if (this.state.index < totalPage - 1) {
      this.setState((prevState) => ({ index: prevState.index + 1 }))
    } else {
      this.setState(() => ({ index: 0 }))
    }
    let rotate = this.icon.style.transform.replace(/[^0-9]/ig, "");
    if (!rotate) {
      rotate = 360;
    } else {
      rotate = parseInt(rotate, 10) +　360;
    }
    this.icon.style.transform = `rotate(${rotate}deg)`;
  }
  // 获取文章分类
  getCategory() {
    system.categoryList().then((res) => {
      this.setState({
        menu: res.data
      })
    })
  }
  // 跳转链接
  toUrl = (id) => {
    if (!id) {
      this.props.history.push({
        pathname: "/"
      });
      return false;
    }
    this.props.set_cate({
      cate: id
    });
    this.props.history.push({
      pathname: `/category/${id}`
    })
  };
  componentDidMount() {
    this.props.get_hot_list();
    this.props.set_cate({
      cate: this.props.match.params.type
    });
    this.getCategory();
    this.setState({
      cid: this.props.match.params.type
    });
  }

  render() {
    const {hotList} = this.props.article;
    const {cate} = this.props.pub;
    const {menu} = this.state;
    let totalPage = Math.ceil(hotList.length / 10);
    let splitList = [];
    if (hotList.length) {
      for (let i = 0; i < totalPage; i++) {
        let data = hotList.slice(i * 10, (i + 1) * 10);
        splitList.push(data)
      }
    }
    return (
      <div className="warp960 flex">
        <Nav className="flex">
          <span onClick={() => this.toUrl()} className={classNames("nav-item",{'active': !cate})}>首页</span>
          {
            menu.map((item) => (
              <span onClick={() => this.toUrl(item.id)}  className={classNames("nav-item",{ 'active': cate * 1 === item.id })} key={item.id}>{item.name}</span>
            ))
          }
          <NavLink className="nav-item" to="/about">关于我</NavLink>
        </Nav>
        <InputBox>
          <SearchInput/>
          <i className="iconfont icon-sousuo"/>
          {/*<CSSTransition*/}
            {/*in={focused || mouseIn}*/}
            {/*timeout={300}*/}
            {/*classNames="slide-down"*/}
            {/*unmountOnExit*/}
            {/*onEnter={() => this.setState({show: true})}*/}
            {/*onExited={() => this.setState({show: false})}*/}
          {/*>*/}
            {/*<div className="hot-box" onMouseEnter={() => this.changeMouse(true)} onMouseLeave={() => this.changeMouse(false)}>*/}
              {/*<div className="hot-box-head flex justify-between items-center">*/}
                {/*<span>热门搜索</span>*/}
                {/*<span onClick={this.changeHot}><i ref={(icon) => this.icon = icon} className="iconfont icon-huanyihuan"/>换一批</span>*/}
              {/*</div>*/}
              {/*<div className="hot-box-list flex wrap-wrap">*/}
                {/*{*/}
                  {/*splitList.length && splitList[index].map((item) => (*/}
                    {/*<div key={item} className="hot-box-list-item">{item}</div>*/}
                  {/*))*/}
                {/*}*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</CSSTransition>*/}
        </InputBox>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  article: state.article,
  pub: state.pub
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    set_cate,
    get_hot_list
  }, dispatch)
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavComponent));
