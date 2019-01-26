import React, {Component} from "react";
import { Button, Icon } from 'antd';
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
        return  day + "天前"
    }
};

class ArticleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        article.articleList().then((res) => {
            console.log(res);
            this.setState(() => ({
                articles: res.data.entrylist
            }));
        })
    }
    render() {
        const {articles} = this.state;
        return (
            <Article>
                <div className="article-list">
                    {
                        articles.map((item) => (
                            <Link to="/post" target="_blank" key={item.objectId}>
                                <div className="article-list-item">
                                    <div className="article-list-item-left">
                                        <div className="title">
                                            {
                                                item.collectionCount > 100 && <span className="hot">热</span>
                                            }
                                            {
                                                item.original && <span className="original">专栏</span>
                                            }
                                            <span>{item.user.username}</span>
                                            <span>{getDate(item.createdAt)}</span>
                                            {
                                                item.tags.map((tag) => (
                                                    <span key={tag.title}>{tag.title}</span>
                                                ))
                                            }
                                        </div>
                                        <h3>{item.title}</h3>
                                        <div>
                                            <ButtonGroup>
                                                <Button>
                                                    {item.collectionCount} <Icon type="like" />
                                                </Button>
                                                <Button>
                                                    {item.commentsCount} <Icon type="message" />
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