import React, {Component} from "react";
import {Login, LoginRegBox, Reg} from "./style";
import Modal from "../../public/Modal/Modal";
import {Link} from "react-router-dom";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.toggleShow = this.toggleShow.bind(this);
    this.state = {
      show: false
    }
  }

  toggleShow() {
    this.setState((prev, state) => (
      {
        show: !prev.show
      }
    ))
  }

  render() {
    const {show} = this.state;
    return (
      <LoginRegBox className="flex">
        {
          show &&
          <Modal closeFun={this.toggleShow}>

          </Modal>
        }
        <Login>
          <a href="/">Aa</a>
          <Link to="/login">登录</Link>
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