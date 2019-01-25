import React, {Component} from "react";
import {InputBox, Nav} from "./style";
import {connect} from "react-redux";
import {get_hot_list} from "../../store/modules/article/actions";
import {VelocityComponent} from "velocity-react"

class NavComponent extends Component {
    constructor(props) {
        super(props);
        this.changeHot = this.changeHot.bind(this);
        this.changeState = this.changeState.bind(this);
        this.changeMouse = this.changeMouse.bind(this);
        this.state = {
            index: 0,
            focused: false,
            mouseIn: false
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
            this.setState((prevState, props) => ({ index: prevState.index + 1 }))
        } else {
            this.setState((prevState, props) => ({ index: 0 }))
        }
        let rotate = this.icon.style.transform.replace(/[^0-9]/ig, "");
        if (!rotate) {
            rotate = 360;
        } else {
            rotate = parseInt(rotate, 10) +　360;
        }
        this.icon.style.transform = `rotate(${rotate}deg)`;
    }
    componentDidMount() {
        this.props.get_hot_list();
    }
    render() {
        const {hotList} = this.props.article;
        const {index, focused, mouseIn} = this.state;
        let totalPage = Math.ceil(hotList.length / 10);
        let splitList = [];
        if (hotList.length) {
            for (let i = 0; i < totalPage; i++) {
                let data = hotList.slice(i * 10, (i + 1) * 10);
                splitList.push(data)
            }
        }
        let animationProps;
        // 这里似乎有点bug
        if (mouseIn || focused) {
            animationProps = {
                animation: {
                    opacity: 1, translateY: "0px", zIndex: 1
                }
            };
        } else {
            animationProps = {
                animation: {
                    opacity: 0, translateY: "-20px", zIndex: -1
                }
            }
        }
        return (
            <div className="warp960 flex">
                <Nav className="flex">
                    <a className="active" href="/">发现</a>
                    <a href="/">关注</a>
                    <a href="/">消息</a>
                </Nav>
                <InputBox>
                    <input type="text" onFocus={() => this.changeState(true)} onBlur={() => this.changeState(false)} placeholder="搜索"/>
                    <i className="iconfont icon-sousuo"/>
                    <VelocityComponent {...animationProps} duration={200}>
                        <div className="hot-box" onMouseEnter={() => this.changeMouse(true)} onMouseLeave={() => this.changeMouse(false)}>
                            <div className="hot-box-head flex justify-between items-center">
                                <span>热门搜索</span>
                                <span onClick={this.changeHot}><i ref={(icon) => this.icon = icon} className="iconfont icon-huanyihuan"/>换一批</span>
                            </div>
                            <div className="hot-box-list flex wrap-wrap">
                                {
                                    splitList.length && splitList[index].map((item) => (
                                        <div key={item} className="hot-box-list-item">{item}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </VelocityComponent>
                </InputBox>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    article: state.article
});
const mapDispatchToProps = (dispatch) => ({
    get_hot_list () {
        dispatch(get_hot_list());
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);