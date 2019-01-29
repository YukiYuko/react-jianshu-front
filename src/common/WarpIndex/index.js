import React from "react";
import {Affix, BackTop, Col, Row} from "antd";
import {Left, Right} from "../../views/home/style";
import RecommendAuthor from "../../views/home/components/RecommendAuthor";

const WarpIndex = (props) => (
  <div className="warp960">
    <Row gutter={16}>
      <Col className="gutter-row" span={16}>
        <Left>
          {
            props.children
          }
        </Left>
      </Col>
      <Col className="gutter-row" span={8}>
        <Affix offsetTop={88}>
          <Right>
            <RecommendAuthor/>
          </Right>
        </Affix>
      </Col>
    </Row>
    <BackTop />
  </div>
);

export default WarpIndex;