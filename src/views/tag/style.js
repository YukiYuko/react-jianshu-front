import styled from "styled-components";
import { titleColor, grayColor } from "../../assets/style/var";

const TagBg = require("../../assets/images/tags.png");
const TagView = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
`;
const Block = styled.div`
  .block {
    background-color: rgba(0, 0, 0, 0.1);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
    &-box {
      height: 200px;
      background: url(${TagBg}) top #505050;
      background-size: 150px;
      .typed-text-h {
        font-size: 18px;
        color: #ffffff;
        margin-bottom: 10px;
      }
      p {
        font-size: 14px;
        color: #d0d0d0;
      }
    }
  }
`;
// 标签列表
const BlockList = styled.div`
  .tag-view-list {
    padding: 20px 0;
    &-head {
      padding: 10px 0;
      display: inline-block;
      .switch-list {
        background-color: #ffffff;
        padding: 10px;
        box-shadow: 0 2px -1px 4px rgba(0, 0, 0, 0.1);
        span {
          cursor: pointer;
          padding: 5px 10px;
          transition: all 0.2s;
          display: inline-block;
          &.active,
          &:hover {
            background-color: #e7e7e7;
          }
          i {
            font-size: 25px;
            color: #111111;
          }
        }
      }
    }
    //  列表展示
    .pic-list {
      display: flex;
      flex-wrap: wrap;
      margin-right: -5px;
      margin-left: -5px;
      &-item {
        width: 33.33%;
        padding: 0 5px;
        display: block;
        &-text {
          width: 100%;
          .img-box {
            display: none;
          }
          .pic-list-item-box {
            .text {
              display: flex;
              padding-top: 20px;
              .avatar {
                position: static;
                margin-right: 15px;
              }
              .text-box {
                flex: 1;
              }
              .like {
                top: 20px;
              }
            }
          }
        }
        &-box {
          border-radius: 10px;
          overflow: hidden;
          background-color: #ffffff;
          margin-bottom: 10px;
          position: relative;
          box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          .img-box {
            height: 200px;
            width: 100%;
            overflow: hidden;
          }
          .img {
            width: 100%;
            height: 200px;
            display: block;
          }
          .text {
            padding: 40px 15px 15px;
            position: relative;
            .avatar {
              position: absolute;
              left: 15px;
              top: -30px;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              border: 4px solid #ffffff;
              box-shadow: 0 4px 4px -1px rgba(0, 0, 0, 0.1);
            }
            h3 {
              font-size: 18px;
              color: ${titleColor};
              margin-bottom: 10px;
            }
            p {
              color: ${grayColor};
              font-size: 12px;
              margin-bottom: 10px;
              span {
                margin-right: 15px;
              }
            }
          }
          .tag {
            span {
              display: inline-block;
              background-color: #eee8f5;
              margin-right: 10px;
              padding: 5px 10px;
              color: #78539b;
              min-width: 60px;
              border-radius: 20px;
              text-align: center;
            }
          }
          // 喜欢
          .like {
            position: absolute;
            right: 20px;
            top: -25px;
            background-color: #ffffff;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);
            color: #bcbcbc;
            i {
              font-size: 20px;
            }
            &.active {
              color: #ec008c;
            }
          }
        }
      }
    }
  }
`;

export { TagView, Block, BlockList };
