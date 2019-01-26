import React, {Component} from "react";
import {HeadWarper} from "./style";
import {connect} from "react-redux";
import LogoComponent from "./Logo";
import NavComponent from "./Nav";
import LoginComponent from "./Login";
import {Affix} from "antd";
class HeaderComponent extends Component {
    render() {
        console.log(this.props.user)
        return (
            <Affix offsetTop={0}>
                <HeadWarper>
                    <div className="warp1440">
                        <LogoComponent/>
                        <NavComponent/>
                        <LoginComponent/>
                    </div>
                </HeadWarper>
            </Affix>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});
const mapDispatchToProps = () => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);