import React, { Component } from "react";
import {Row, Col, BackTop} from "antd";
import { MessageContainer } from "./style";
import Header from "../../common/Header/Header";
import VComments from "../../common/Comments";
import messageApi from "../../api/message";
import { tips } from "../../actions";
import "./style.less";
import Swing from "../../common/Swing";
import system from "../../api/system";

const Rem = require("../../assets/images/rem.jpg");

class Message extends Component {
  state = {
    list: [],
    count: 1,
    links: []
  };

  componentDidMount() {
    this.getCommentList();
    this.getLinks();
  }

  // 发表留言
  submit = (data) => {
    messageApi.create(data).then(() => {
      tips("发表成功");
      this.getCommentList();
    });
  };
  // 留言列表
  getCommentList(page = 1) {
    messageApi.list({page}).then(res => {
      this.setState({
        list: res.data.rows,
        count: res.data.count
      });
    });
  }
  // change
  change = (page) => {
    this.getCommentList(page);
  };

  // 获取友情链接
  getLinks() {
    system.LinkList({limit: null}).then(res => {
      this.setState({
        links: res.data
      });
    });
  }

  render() {
    const { list, count, links } = this.state;
    return (
      <MessageContainer>
        <Header />
        <div className="warp960 pd__top20">
          {/*message__head*/}
          <div className="message__head flex justify-center">
            <div className="box">
              <div className="content flex dir-column items-center justify-center">
                <img src={Rem} alt="星白凛" />
                <h2>欢迎大家~ 这里是 星白凛 </h2>
                <p>
                  你可以在这里把所有想对我说的话写下来，我会每一个仔细查看的~
                </p>
                <p>相遇，即是缘分。 来了，就留下点足迹吧~</p>
              </div>
            </div>
          </div>
          {/*友人帐*/}
          <div className="friends_account">
            <div className="friends_account_title">
              <Swing/>
            </div>
            <div className="friends_account_tips alephent-card">
              <figcaption/>
              <div className="cell">
                <span>欢迎交换友链 ꉂ(ˊᗜˋ)</span>
                <span>请留言告诉我你的：</span>
                <span>一、名字</span>
                <span>二、一句话介绍</span>
                <span>三、主页地址</span>
                <span>四、头像（HTTPS*，可在评论区上传）</span>
              </div>
              <div className="example">
                <p>For Example：</p>
                <p>★ Name: Mashiro</p>
                <p>★ Bio: 樱花庄的白猫</p>
                <p>★ URL: https://2heng.xin</p>
                <p>★ Avatar: 获取嵌入代码</p>
              </div>
            </div>
            <div className="friends_account_list">
              <Row gutter={16}>
                {
                  links.map((item, index) => (
                    <Col className="gutter-row" span={8} key={index}>
                      <div className="friends_account_list_item flex items-center card-template">
                        <div className="figcaption"/>
                        <div className="left">
                          <img src={item.image || item.avatar} alt={item.title}/>
                        </div>
                        <div className="right box1">
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </Col>
                  ))
                }
                <Col className="gutter-row" span={8}>
                  <div className="friends_account_list_item flex items-center card-template">
                    <div className="figcaption"/>
                    <div className="left">
                    </div>
                    <div className="right box1">
                      <h3>能跟我成为友人吗？ 少年</h3>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          {/*message__cont*/}
          <div className="message__cont">
            <VComments count={count} submit={this.submit} list={list} change={this.change}/>
          </div>
        </div>

        <BackTop />
      </MessageContainer>
    );
  }
}

export default Message;
