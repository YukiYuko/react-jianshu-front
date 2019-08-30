import React, {Component} from "react";
import {Banner} from "../style";
import {Carousel} from 'antd';
import {system} from "../../../api";

class BannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: []
    }
  }

  componentDidMount() {
    system.bannerList().then((res) => {
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
              <a href={item.url} key={index} target="_blank" rel="noopener noreferrer">
                <img style={{width: "100%", height: "100%", position: "absolute", left: 0, top: 0}} src={item.image} alt={item.title}/>
              </a>
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