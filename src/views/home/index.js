import React, {Component} from "react";
import {Left, Right} from "./style"
import Banner from "./components/Banner";
import Topic from "./components/Topic";
import RecommendAuthor from "./components/RecommendAuthor";
import Article from "./components/Article";
import {Row, Col, Affix, BackTop} from 'antd';
import Header from "../../common/Header/Header";

class HomeComponent extends Component {
  render() {
    return (
      <div className="home">
        <Header/>
        <div className="warp960" style={{paddingTop: "30px"}}>
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
      </div>
    );
  }
}

export default HomeComponent