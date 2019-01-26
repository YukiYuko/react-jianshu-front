import React, {Component} from "react";
import {RecommendAuthor} from "../style";
import Exchange from "../../../common/Exchange";
import { article } from "../../../api";
import { nFormatter } from "../../../untils";

class RecommendAuthorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: []
        }
    }
    componentDidMount() {
        article.recommendAuthor().then((res) => {
            this.setState(() => ({
                authors: res.users
            }));
        })
    }
    render() {
        const {authors} = this.state;
        return (
            <RecommendAuthor>
                <div className="author-head flex justify-between items-center">
                    <span className="title">推荐作者</span>
                    <Exchange/>
                </div>
                <div className="author-list">
                    {
                        authors.map((item, index) => (
                            <div key={index} className="author-list-item flex justify-between items-center">
                                <div className="author-list-item-image">
                                    <img src={item.avatar_source} alt=""/>
                                </div>
                                <div className="author-list-item-text box1">
                                    <h3>{item.nickname}</h3>
                                    <p>
                                        <span>写了 {nFormatter(item.total_wordage)} 字</span>
                                        <span>·</span>
                                        <span>{nFormatter(item.total_likes_count)} 喜欢</span>
                                    </p>
                                </div>
                                <div  className="author-list-item-follow">
                                    <i>+</i>
                                    关注
                                </div>
                            </div>
                        ))
                    }
                </div>
            </RecommendAuthor>
        )
    }
}

export default RecommendAuthorComponent