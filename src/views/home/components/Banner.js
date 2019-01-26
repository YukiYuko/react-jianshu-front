import React, {Component} from "react";
import {Banner} from "../style";
import { Carousel } from 'antd';
import { article } from "../../../api"

class BannerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: []
        }
    }
    componentDidMount() {
        article.banner().then((res) => {
            this.setState(() => ({
                banner: res.data
            }));
        })
    }

    render() {
        const {banner} = this.state;
        return (
            <Banner>
                <Carousel autoplay ref={slider => this.slider = slider}>
                    {
                        banner.map((item, index) => (
                            <img src={item.src} key={index} alt=""/>
                        ))
                    }
                </Carousel>
                <div onClick={() => this.slider.prev()} className="prev flex items-center justify-center">
                    <i className="iconfont icon-prev"/>
                </div>
                <div onClick={() => this.slider.next()} className="next flex items-center justify-center">
                    <i className="iconfont icon-next"/>
                </div>
            </Banner>
        );
    }
}

export default BannerComponent