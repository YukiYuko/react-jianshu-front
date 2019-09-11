import styled from "styled-components";

// const position = css`
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
// `;

const Warp960 = styled.div`
  max-width: 800px;
  position: relative;
  margin: auto;
  padding-bottom: 30px;
`;

const DetailWarp = styled.div`
  //padding-bottom: 50px;
  height: 100vh;
  overflow: auto;
  .posterImg {
    animation: scale-in ease-in-out 0.3s;
  }
  .sub_head {
    padding: 20px 0;
    text-align: right;
    span {
      margin-right: 20px;
    }
  }
  .label {
    span {
      margin-right: 10px;
    }
  }
  .detail {
    padding: 20px 0;
    color: #111111;
    img {
      display: block;
      margin: auto;
      max-width: 100%;
    }
    // 内容区域
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #333;
      line-height: 1.5;
      margin-top: 20px;
      margin-bottom: 10px;
      padding-bottom: 5px;
    }
    p {
      line-height: inherit;
      margin-top: 22px;
      margin-bottom: 22px;
    }
    code {
      background-color: #fff5f5;
      color: #ff502c;
      font-size: 0.87em;
      padding: 0.065em 0.4em;
      border-radius: 2px;
      overflow-x: auto;
      word-break: break-word;
    }
    pre {
      position: relative;
      line-height: 1.75;
      background: #f8f8f8;
      padding: 18px 15px 12px;
      code {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        color: #333;
        background: #f8f8f8;
      }
    }
    ul,
    ol {
      padding-left: 28px;
      margin-bottom: 15px;
      li {
        margin-bottom: 0;
        list-style: initial;
        line-height: 20px;
      }
    }
    blockquote {
      line-height: 24px;
    }
  }
  // 这是文章内容导航
  #catalog-content {
    position: fixed;
    right: 20px;
    top: 100px;
    li {
      line-height: 25px;
    }
  }
  // 这是点赞 ***************************************
  .like {
    text-align: center;
    margin-bottom: 30px;
    &-number {
      color: #999999;
    }
    .heart label {
      box-shadow: 0px 0px 0px 0px rgba(226, 32, 44, 0.5);
    }
    .heart label:after {
      content: "\\f004";
    }
    .heart input:checked + label {
      background-color: #e2202c;
      border-color: #e2202c;
      box-shadow: 0px 0px 0px 0.5em rgba(226, 32, 44, 0);
    }
    .heart input:checked + label:after {
      color: #e2202c;
    }
    .anim-icon {
      width: 1.9em;
      height: 1.9em;
      margin: 10px;
      font-size: 13px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
    }
    .anim-icon input {
      display: none;
    }
    .anim-icon label {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 0.1em solid #ccc;
      border-radius: 100%;
      display: block;
      font: normal normal normal 13px/1 FontAwesome;
      color: #ccc;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      cursor: pointer;
    }
    .anim-icon label:after {
      left: 0;
      top: 50%;
      margin-top: -0.5em;
      display: block;
      position: relative;
      text-align: center;
    }
    .anim-icon input:checked + label {
      -webkit-animation: check-in 0.3s forwards;
      animation: check-in 0.3s forwards;
      -webkit-transition: background-color 0.1s 0.2s, box-shadow 1s;
      transition: background-color 0.1s 0.2s, box-shadow 1s;
      border-width: 0.1em;
      border-style: solid;
    }
    .anim-icon input:checked + label:after {
      -webkit-animation: icon 0.3s forwards;
      animation: icon 0.3s forwards;
    }
    .anim-icon-md {
      font-size: 20px;
    }
    .anim-icon-lg {
      font-size: 30px;
    }

    @keyframes icon {
      0% {
        margin-top: -0.5em;
        font-size: 1.5em;
      }
      100% {
        font-size: 1em;
        opacity: 1;
        color: white;
      }
    }
    @keyframes check-in {
      0% {
        left: 20%;
        top: 20%;
        width: 60%;
        height: 60%;
      }
      80% {
        left: -5%;
        top: -5%;
        width: 110%;
        height: 110%;
      }
      100% {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    @keyframes check {
      0% {
        left: 5%;
        top: 5%;
        width: 90%;
        height: 90%;
      }
      10% {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      80% {
        left: -5%;
        top: -5%;
        width: 110%;
        height: 110%;
      }
      90% {
        left: 5%;
        top: 5%;
        width: 90%;
        height: 90%;
      }
      100% {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  // 这是点赞 ***************************************
  .discuss {
    &-publish {
      margin-bottom: 20px;
      &-head {
        position: relative;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 700;
        em {
          font: 22px/24px Georgia;
          color: #f85959;
        }
      }
    }
    &-comment {
      padding-left: 65px;
      &-item {
        padding: 20px 10px;
        border: 1px solid #e7e7e7;
        margin-bottom: 10px;
        .left {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e7e7e7;
          margin-right: 15px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          h3 {
            font-size: 16px;
            margin-bottom: 10px;
            span {
              color: #999;
              font-size: 12px;
              margin-left: 10px;
            }
            .os {
              background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
              margin-right: 10px;
              padding: 3px 6px;
              border-radius: 20px;
              font-size: 12px;
              color: #ffffff;
            }
          }
          p {
            color: #999;
            margin-bottom: 15px;
          }
          .reply {
            margin-bottom: 5px;
            &-comment {
              color: #1279ff;
              cursor: pointer;
              i {
                vertical-align: middle;
              }
            }
            &-box {
              .heart {
                cursor: pointer;
                &.active {
                  color: #ff1a5e;
                }
                i {
                  font-size: 20px;
                }
              }
            }
          }
          .reply-list {
            &-item {
              .left {
                width: 30px;
                height: 30px;
                background-color: #9d9d9d;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }
              .right {
                h3 {
                  font-weight: normal;
                  span:nth-child(1) {
                    font-size: 14px;
                    color: #ff3866;
                    margin-left: 0;
                    i {
                      color: #111;
                      cursor: pointer;
                      em {
                        color: #00a1d6;
                      }
                    }
                  }
                  span:nth-child(2) {
                    margin-left: 15px;
                    font-size: 12px;
                    color: #666;
                  }
                }
                p {
                  span {
                    margin-right: 10px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .rotate-menu {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    top: 30%;
    left: -120px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      //border: 1px solid #3e4b5d;
      animation: rota 2s linear alternate;
    }
    //@keyframes rota {
    //  from {
    //    border-color: #3e4b5d;
    //  }
    //  to {
    //    border-color: #5a86ff;
    //  }
    //}
    &:before {
      width: 160px;
      height: 160px;
      margin-left: -80px;
      margin-top: -80px;
    }
    &:after {
      width: 240px;
      height: 240px;
      margin-left: -120px;
      margin-top: -120px;
    }
    span {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      z-index: 1;
      i {
        color: #ffffff;
        font-size: 20px;
      }
    }
    .position {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transition: all 0.3s ease-in-out;
      margin: auto;
    }
    .share {
      background-color: #2e3846;
      box-shadow: 0 3px 2px -2px #2e3846;
      z-index: 2;
    }
    .share1 {
      background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
      box-shadow: 0 3px 2px -2px #7367f0;
      opacity: 0;
      &.active {
        transform: translateY(60px);
        opacity: 1;
      }
    }
    .share2 {
      background-image: linear-gradient(135deg, #e2b0ff 10%, #9f44d3 100%);
      box-shadow: 0 3px 2px -2px #9f44d3;
      opacity: 0;
      &.active {
        transform: translateY(120px);
        opacity: 1;
      }
    }
    .share3 {
      background-image: linear-gradient(135deg, #97abff 10%, #123597 100%);
      box-shadow: 0 3px 2px -2px #123597;
      opacity: 0;
      &.active {
        transform: translateY(180px);
        opacity: 1;
      }
    }
    .share4 {
      background-image: linear-gradient(135deg, #69ff97 10%, #00e4ff 100%);
      box-shadow: 0 3px 2px -2px #00e4ff;
      opacity: 0;
      &.active {
        transform: translateY(240px);
        opacity: 1;
      }
    }
  }

  // 一些动画
  @keyframes scale-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;
export { DetailWarp, Warp960 };
