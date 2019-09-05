import styled from "styled-components";
import { grayBorderColor } from "../../assets/style/var";

const ProfileContainer = styled.div`
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const LeftBar = styled.div`
  width: 80px;
  background-color: #fff;
  height: 100%;
  box-shadow: 4px 0 2px -2px rgba(0, 0, 0, 0.03);
  position: relative;
  .logo {
    padding: 20px 5px;
    img {
      width: 100%;
    }
  }
  .loginOut {
    position: absolute;
    bottom: 70px;
    width: 100%;
    height: 80px;
    cursor: pointer;
    i {
      font-size: 25px;
    }
  }
`;
const CenterContainer = styled.div`
  width: 35%;
  height: 100%;
  padding: 50px;
  overflow: auto;
  .userInfo {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
    &_avatar {
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    &_mess {
      margin-left: 15px;
      padding-right: 20px;
      h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      p {
        margin-bottom: 10px;
      }
    }
    &_setting {
      padding: 0 15px;
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
  }
  .follow {
    margin-bottom: 40px;
    &_item {
      width: 30%;
      background-color: #ffffff;
      position: relative;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-size: 16px;
      &:hover {
        background-color: #ffcb00;
        color: #111111;
      }
      p {
        margin: 0;
        padding: 10px;
      }
    }
  }
  .article {
    &_title {
      font-size: 18px;
      margin-bottom: 20px;
      span {
        font-weight: bold;
      }
      span.ant-dropdown-link {
        color: #666;
        font-size: 14px;
        cursor: pointer;
      }
    }
    &_list {
      &_item {
        background-color: #ffffff;
        margin-bottom: 10px;
        min-height: 80px;
        .left {
          padding: 15px;
          .img {
            width: 100px;
            height: 70px;
          }
          &_mess {
            margin-left: 10px;
            width: 0;
            h3 {
              margin-bottom: 15px;
            }
            p {
              margin-bottom: 5px;
            }
            div {
              font-size: 12px;
              margin-bottom: 10px;
              color: #999999;
              span {
                margin-right: 10px;
                i {
                  margin-left: 5px;
                  color: #0da4d3;
                }
              }
            }
          }
        }
        .center {
          width: 20%;
          border-left: 1px solid ${grayBorderColor};
          border-right: 1px solid ${grayBorderColor};
          cursor: pointer;
        }
        .right {
          width: 20%;
          span {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05),
              inset 0 -0.25em 0 rgba(0, 0, 0, 0.08),
              0 0.25em 0.25em rgba(0, 0, 0, 0.05);
            margin: 0 5px;
            cursor: pointer;
            color: #111111;
            &:active {
              box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1),
                inset 0 2px 0 rgba(255, 255, 255, 0.08),
                inset 0 0.25em 0.5em rgba(0, 0, 0, 0.05);
              margin-top: 0.25em;
              padding-bottom: 0.5em;
            }
          }
        }
      }
    }
  }
`;
const RouteContainer = styled.div`
  width: 30%;
  padding: 20px 0 20px 15px;
  .routerWarp {
    height: 100%;
  // 关注和粉丝
    .following {
      
    }
  }
`;
const RightContainer = styled.div`
  flex: 1;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  .soup {
    background-color: #ffffff;
    min-height: 180px;
    margin-bottom: 15px;
    padding: 0 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      padding: 20px 0;
      color: #ff5722;
    }
    &__content {
      line-height: 25px;
      margin-bottom: 10px;
      font-size: 16px;
    }
    &__from {
      text-align: right;
      color: #999;
      font-size: 14px;
      margin-bottom: 15px;
    }
    &__author {
      color: #999999;
    }
  }
  .dayArticle {
    flex: 1;
    background-color: #ffffff;
    padding: 0 20px 15px;
    overflow: auto;
    &__title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      padding: 20px 0;
    }
    &__content {
      color: #666666;
      line-height: 25px;
      margin-bottom: 20px;
    }
    &__from {
      text-align: right;
      color: #999;
      font-size: 14px;
      margin-bottom: 15px;
    }
    &__author {
      text-align: right;
      color: #999999;
    }
  }
`;
export {
  ProfileContainer,
  LeftBar,
  CenterContainer,
  RightContainer,
  RouteContainer
};
