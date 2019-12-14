import styled from "styled-components";
import { grayColor } from "../../assets/style/var";

const FooterBg = require("../../assets/images/footer.png");
const HomeBanner = require("../../assets/images/KyotoAnimation.jpg");

export const HomeContainer = styled.div`
  background-color: #f7f7f7;
  .homeBanner {
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;
    background-image: url(${HomeBanner});
    background-position: center center;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      //z-index: 3;
      background-attachment: fixed;
      background-image: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/dot.gif);
    }
    // 面包按钮
    .hamburger {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 100;
      cursor: pointer;
      .line {
        width: 50px;
        height: 5px;
        background-color: rgba(0, 0, 0, 0.7);
        display: block;
        margin: 8px auto;
        transition: all 0.3s ease-in-out;
      }
      &.hamburger-1.active {
        .line:nth-child(1) {
          transform: translateY(13px) rotate(45deg);
        }
        .line:nth-child(2) {
          opacity: 0;
        }
        .line:nth-child(3) {
          transform: translateY(-13px) rotate(-45deg);
        }
      }
    }
    // 个人介绍
    .card-container {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 20px !important;
      max-width: 500px;
      height: 500px;
      z-index: 4;
    }
    .card-container .card {
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 300px;
      height: 200px;
      padding: 20px;
      overflow: hidden;
      background: #252525;
      border-radius: 10px;
      box-shadow: -2px 2px 0px 0px #202020,
        -10px 10px 40px 0px rgba(0, 0, 0, 0.3);
      transform: translate(0px, 0px) rotateX(30deg) rotateZ(-20deg);
      z-index: 2;
      transition: all 1s;
    }
    .card-container .card:hover {
      transform: translate(0px, -20px) rotateX(10deg) rotateZ(-20deg);
      box-shadow: -2px 1px 0px 0px #202020, -40px 40px 40px 0 rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .card-container .card h1 {
      color: #ffffff;
      font-size: 20px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 20px;
    }
    .card-container .card h1:nth-of-type(2) {
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }
    .card-container .card h3 {
      color: #ffffff;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 5px;
    }
    .card-container .card h3:nth-of-type(2) {
      font-size: 14px;
      font-weight: 400;
    }
    .card-container .card p {
      position: absolute;
      left: 20px;
      bottom: 15px;
    }
    .card-container .card i {
      margin-right: 10px;
      font-size: 20px;
      color: #ffffff;
    }
    .card-container #location {
      color: #fff;
    }
    .card-container .card .circle {
      position: absolute;
      margin: auto;
      top: 10%;
      bottom: 0;
      right: -50%;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: #202020;
      z-index: -2;
    }
    .card-container .card .circle:nth-of-type(2) {
      width: 100px;
      height: 100px;
      top: 90%;
      right: -20%;
      z-index: -1;
      background: crimson;
    }
    .card-container .card {
      animation: hvr 5s infinite ease-in-out;
    }
    @keyframes hvr {
      0% {
        box-shadow: -2px 2px 0px 0px #202020,
          -10px 10px 40px 0px rgba(0, 0, 0, 0.3);
        transform: translate(0px, 0px) rotateX(30deg) rotateZ(-20deg);
      }
      50% {
        transform: translate(0px, -20px) rotateX(30deg) rotateZ(-20deg);
        box-shadow: -2px 1px 0px 0px #202020,
          -40px 40px 40px 0 rgba(0, 0, 0, 0.2);
      }
      100% {
        box-shadow: -2px 2px 0px 0px #202020,
          -10px 10px 40px 0px rgba(0, 0, 0, 0.3);
        transform: translate(0px, 0px) rotateX(30deg) rotateZ(-20deg);
      }
    }

    @media only screen and (max-width: 780px) {
      .card-container .card h1 {
        font-size: 18px;
      }
      .card-container .card h1:nth-of-type(2) {
        font-size: 14px;
      }
      .card-container .card h3 {
        font-size: 12px;
      }
      .card-container .card h3:nth-of-type(2) {
        font-size: 10px;
      }
      .card-container .card .circle {
        right: -70%;
      }
    }
    #scene {
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 5;
      display: flex;
      #left-menu-layer {
        .left-menu-box {
          height: 100vh;
          width: 50vh;
          margin: 0 auto auto 2vh;
          transform: perspective(40em) rotateY(10deg) scale(0.9);
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-end;
          &-container {
            height: 250px;
            width: 420px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            //transform: scale(1);
            transform: scale(1.48392);
            transform-origin: bottom left;
            .top {
              height: 40%;
              width: 100%;
              .dialog {
                background-color: rgba(0, 0, 0, 0.7);
                padding: 10px 5px;
                margin: 0 5px;
                width: calc(100% - 20px);
                height: 57px;
                font-family: "Noto Sans SC", sans-serif;
                color: #fff;
                font-size: 13px;
                font-weight: 500;
                line-height: 57px;
              }
            }
          }
        }
      }
      #right-menu-layer {
        right: 0 !important;
        left: auto !important;
        bottom: 0 !important;
        top: auto !important;
        .right-menu-box {
          transform: translate3d(-28.3px, -4.3px, 0px);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          //height: 100vh;
          width: 50vh;
          &-container {
            width: 783px;
            height: 640px;
            /* margin: 0 auto auto calc(51vw - 40px); */
            float: right;
            margin: 0 -80px auto auto;
            transform: perspective(40em) rotateY(-10deg) scale(0.9);
            .share {
              background-color: rgba(0, 0, 0, 0.7);
              padding: 10px 5px;
              margin: 0 5px;
              height: 300px;
              color: #fff;
              font-size: 13px;
              font-weight: 500;
              line-height: 57px;
            }
          }
        }
      }
      // 中间层
      .center-widget {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 362px;
        height: 300px;
        transform: translate(-50%, -50%);
        z-index: 1;
        &.active {
          .center-widget-item {
            transform: scale(1);
            transition: all 0.5s cubic-bezier(0.67, 0.13, 0.1, 0.81);
          }
          .center-widget-item:nth-child(2) {
            transform-origin: left bottom;
            transition-delay: 0.2s;
          }
          .center-widget-item:nth-child(3) {
            transform-origin: right top;
            transition-delay: 0.4s;
          }
          .center-widget-item:nth-child(4) {
            transform-origin: left top;
            transition-delay: 0.6s;
          }
        }
        &-item {
          width: 180px;
          height: 148px;
          padding: 40px 10px;
          margin: 0.5px;
          float: left;
          background: rgba(255, 255, 255, 0.9);
          text-align: center;
          box-shadow: 0 5px 20px rgba(0, 64, 58, 0.15);
          transition: all 0.3s cubic-bezier(0.67, 0.13, 0.1, 0.81);
          transform-origin: right bottom;
          transform: scale(0);
          &:nth-child(2) {
            transform-origin: left bottom;
            transition-delay: 0.1s;
          }
          &:nth-child(3) {
            transform-origin: right top;
            transition-delay: 0.2s;
          }
          &:nth-child(4) {
            transform-origin: left top;
            transition-delay: 0.3s;
          }
          h2 {
            font-size: 11px;
            opacity: 0.8;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          .val {
            font-size: 50px;
            font-weight: 100;
            color: #343a42;
          }
        }
      }
    }
  }
  /* Menu */
`;
// 左右布局相关***********************************
export const Left = styled.div``;
export const Right = styled.div`
  min-height: 400px;
`;
// banner 相关***********************************
export const Banner = styled.div`
  color: ${grayColor};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .ant-carousel {
    position: relative;
    .slick-slide {
      text-align: center;
      height: 270px;
      line-height: 160px;
      background: #364d79;
      overflow: hidden;
      position: relative;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .prev,
  .next {
    opacity: 0;
    transition: all 0.3s ease-in-out;
    position: absolute;
    background-image: none;
    background-color: rgba(0, 0, 0, 0.4);
    height: 50px;
    width: 40px;
    top: 40%;
    filter: alpha(opacity=50);
    font-size: 20px;
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
  .prev {
    transform: translateX(-40px);
  }
  .next {
    right: 0;
    transform: translateX(40px);
  }
  &:hover .prev,
  &:hover .next {
    opacity: 1;
    transform: translateX(0);
  }
`;
// 专题相关
export const Topic = styled.div`
  height: 50px;
  line-height: 1;
  display: block;
  margin-bottom: 10px;
  &:nth-child(1) {
    margin-top: -4px;
  }
  img {
    height: 50px;
    width: 100%;
    border-radius: 4px;
  }
`;
// 推荐作者
export const RecommendAuthor = styled.div`
  min-height: 300px;
  color: ${grayColor};
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  .author-head {
    margin-bottom: 15px;
    .title {
      font-size: 15px;
    }
  }
  .author-list {
    &-item {
      margin-bottom: 10px;
      &-image {
        margin-right: 10px;
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
      }
      &-text {
        margin-right: 20px;
        h3 {
          font-size: 15px;
          margin-bottom: 5px;
        }
        p {
          font-size: 12px;
          color: ${grayColor};
          span:nth-child(2) {
            margin: 0 4px;
          }
        }
      }
      &-follow {
        font-size: 14px;
        color: #00e22e;
        cursor: pointer;
        i {
          font-size: 20px;
        }
      }
    }
  }
`;

// 文章列表*******************************************8
export const Article = styled.div`
  min-height: 1000px;
  margin-top: 30px;
  .article-list {
    &-item {
      padding: 20px;
      cursor: pointer;
      background-color: #fff;
      box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.02);
      position: relative;
      overflow: hidden;
      margin-bottom: 10px;
      &:after,
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        background-color: #2752d3;
        transition: all 0.3s ease;
      }
      &:after {
        bottom: 0;
        transform: translateX(100%);
      }
      &:before {
        top: 0;
        transform: translateX(-100%);
      }
      &:hover:before,
      &:hover:after {
        transform: translateX(0%);
      }
      &-left {
        .title {
          font-size: 13px;
          color: ${grayColor};
          margin-bottom: 10px;
          .hot {
            font-weight: 500;
            color: #ff334c;
          }
          .original {
            color: #b71ed7;
            font-weight: 500;
          }
          span:not(:last-child):after {
            content: "·";
            margin: 0 0.4em;
            color: #b2bac2;
          }
        }
        h3 {
          font-size: 16px;
          margin-bottom: 15px;
        }
        div {
          .ant-btn {
            color: ${grayColor};
          }
        }
      }
    }
  }
`;
export const ViewFooter = styled.div`
  background: #232323;
  padding: 15px 0 10px;
  text-align: center;
  color: #888;
  font-size: 12px;
  line-height: 1.5;
  position: relative;
  min-height: 120px;
  .footer-image {
    background: url(${FooterBg}) no-repeat 50%;
    height: 368px;
    z-index: 1;
    position: absolute;
    bottom: 48px;
    width: 100%;
    pointer-events: none;
  }
`;
