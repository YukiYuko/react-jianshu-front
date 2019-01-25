import React, {Component} from "react";
import {Login, LoginRegBox, Reg} from "./style";

class LoginComponent extends Component {
    render() {
        return (
            <LoginRegBox className="flex">
                <Login>
                    <a href="/">Aa</a>
                    <a href="/">登录</a>
                </Login>
                <Reg>
                    <a href="/" className="reg">注册</a>
                    <a href="/" className="write">写文章</a>
                </Reg>
            </LoginRegBox>
        )
    }
}
export default LoginComponent