import React, {Component} from "react";
import {DetailWarp, Warp960} from "./style";
import Back from "../../common/Back";
import article from "../../api/article";
import { BackTop, Tag } from 'antd';

class DetailComponent extends Component {
  state = {
    id: "",
    detail: {}
  };
  // 获取详情
  getData = () => {
    article.articleDetail(this.state.id).then((res) => {
      this.setState({
        detail: res.data
      })
    })
  };

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    }, () => {
      this.getData();
    });
  }

  render() {
    const {history} = this.props;
    const {detail} = this.state;
    return (
      <DetailWarp>
        <Back back={history.goBack} title={detail.title}/>
        <Warp960>
          <div className="sub_head">
            {
              detail.author && <span>作者: {detail.author.username}</span>
            }
            <span>发布时间: {detail.createdAt}</span>
            {
              detail.readNum && <span>点击数: {detail.readNum}</span>
            }
          </div>
          <div className="label">
            <span>标签:</span>
            {
              detail.label && detail.label.split(",").map((item) => (
                <Tag color="magenta">{item}</Tag>
              ))
            }
          </div>
          <div className="detail" dangerouslySetInnerHTML={{__html: detail.content}}>
          </div>
        </Warp960>
        <BackTop/>
      </DetailWarp>
    );
  }
}

export default DetailComponent
