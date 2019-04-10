import React, {Component} from "react";
import {Button, Icon} from 'antd';
import {Article} from "../style";
import {article} from "../../../api/";
import dayjs from 'dayjs';
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;
const getDate = (time) => {
  const date1 = dayjs(new Date());
  const date2 = dayjs(time);
  let hour = date1.diff(date2, 'hour');
  let day = date1.diff(date2, 'day');
  if (hour <= 24) {
    return hour + "小时前"
  } else {
    return day + "天前"
  }
};

class ArticleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  // 获取列表
  getData = () => {
    article.articleList().then((res) => {
      this.setState(() => ({
        articles: res.data.data
      }));
    })
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {articles} = this.state;
    return (
      <Article>
        <div className="article-list">
          {
            articles.map((item) => (
              <Link to={`/post/${item.id}`} target="_blank" key={item.id}>
                <div className="article-list-item">
                  <div className="article-list-item-left">
                    <div className="title">
                      {
                        item.collectionCount > 100 && <span className="hot">热</span>
                      }
                      {
                        item.original && <span className="original">专栏</span>
                      }
                      <span>{item.author.username}</span>
                      <span>{getDate(item.createdAt)}</span>
                      {
                        item.label.split(",").map((tag, index) => (
                          <span key={index}>{tag}</span>
                        ))
                      }
                    </div>
                    <h3>{item.title}</h3>
                    <div>
                      <ButtonGroup>
                        <Button>
                          {item.collectionCount} <Icon type="like"/>
                        </Button>
                        <Button>
                          {item.commentsCount} <Icon type="message"/>
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  <div className="article-list-item-right">

                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </Article>
    );
  }
}

export default ArticleComponent
