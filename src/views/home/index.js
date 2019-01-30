import React, {Component} from "react";
import {Left, Right} from "./style"
import Banner from "./components/Banner";
import Topic from "./components/Topic";
import RecommendAuthor from "./components/RecommendAuthor";
import Article from "./components/Article";
import {Row, Col, Affix, BackTop} from 'antd';
import Modal from "../../public/Modal/Modal";

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.toggleShow = this.toggleShow.bind(this);
    this.state = {
      show: false
    }
  }
  toggleShow () {
    this.setState((prev, state) => (
      {
        show: !prev.show
      }
    ))
  }
  render() {
    const {show} = this.state;
    return (
      <div className="warp960">
        {
          show && <Modal closeFun={this.toggleShow}/>
        }
        <button onClick={this.toggleShow}>aaaaa</button>
        <Row gutter={16}>
          <Col className="gutter-row" span={16}>
            <Left>
              <Banner/>
              <Article/>
            </Left>
          </Col>
          <Col className="gutter-row" span={8}>
            <Affix offsetTop={88}>
              <Right>
                <Topic/>
                <RecommendAuthor/>
              </Right>
            </Affix>
          </Col>
        </Row>
        <BackTop/>
      </div>
    );
  }
}

export default HomeComponent