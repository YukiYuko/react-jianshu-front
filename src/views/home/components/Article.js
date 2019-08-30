import React, {Component} from "react";
import {Button, Icon} from 'antd';
import {Article} from "../style";
import {article} from "../../../api";
import dayjs from 'dayjs';
import {Link} from "react-router-dom";
import LoadMore from "../../../common/LoadMore";

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
      articles: [],
      count: 0,
      page: 1
    }
  }

  // 获取列表
  getData = () => {
    article.articleList({
      page: this.state.page
    }).then((res) => {
      let { articles, page } = this.state;
      setTimeout(() => {
        this.setState(() => ({
          articles: [...articles, ...res.data.data],
          count: res.data.count,
          page: page + 1
        }));
        this.child.reset();
      }, 500);
    })
  };

  componentDidMount() {
  }

  // 绑定子组件实例
  onRef = (ref) => {
    this.child = ref;
  };

  render() {
    const {articles, count, page} = this.state;
    return (
      <Article>
        <LoadMore useWindow={true} onRef={this.onRef} articles={articles} count={count} page={page} getData={this.getData}>
          <div className="article-list">
            {
              articles.map((item) => (
                <Link to={`/post/${item.id}`} key={item.id}>
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
                          item.tags.map((tag, index) => (
                            <span key={index}>{tag.tag.name}</span>
                          ))
                        }
                      </div>
                      <h3>{item.title}</h3>
                      <div>
                        <ButtonGroup>
                          <Button>
                            {item.likes.length} <Icon type="like"/>
                          </Button>
                          <Button>
                            {item.comments.length} <Icon type="message"/>
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
        </LoadMore>
      </Article>
    );
  }
}

export default ArticleComponent
