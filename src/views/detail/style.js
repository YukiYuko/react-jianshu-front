import styled from 'styled-components';
import {grayColor} from "../../assets/style/var";

const Warp960 = styled.div`
  max-width: 800px;
  position: relative;
  margin: auto;
`;

const DetailWarp = styled.div`
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
    img {
      display: block;
      margin: auto;
    }
  }
  .discuss {
    &-publish {
      margin-bottom: 20px;
      &-head {
        position: relative;
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 700;
        em {
          font:  22px/24px Georgia;
          color: #f85959;
        }
      }
      &-body {
        .left {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #efefef;
          margin-right: 15px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .right {
          border: 1px solid #e7e7e7;
          .input-box {
            padding: 15px;
            textarea {
              height: 110px;
              display: block;
              font-size: 16px;
              width: 100%;
              resize: none;
              border: 0;
              outline: 0;
              padding: 0;
              transition: all .4s;
            }
          }
          .submit-box {
            text-align: right;
            padding: 10px;
            border-top: 1px solid #e7e7e7;
          }
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
            span {
              color: #999;
              font-size: 12px;
              margin-left: 10px;
            }
          }
          p {
            color: #999;
          }
          .reply {
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
                i {
                 font-size: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
  .rotate-menu {
    position: fixed;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    //border: 1px solid #3e4b5d;
    top: 30%;
    left: 200px;
    &:before, &:after {
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
    a {
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
    .share {
      background-color: #2e3846;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 3px 2px -2px #2e3846;
    }
    .share1 {
      background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);
      left: -60px;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 3px 2px -2px #7367F0;
    }
    .share2 {
      background-image: linear-gradient( 135deg, #E2B0FF 10%, #9F44D3 100%);
      top: -60px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 3px 2px -2px #9F44D3;
    }
    .share3 {
      background-image: linear-gradient( 135deg, #97ABFF 10%, #123597 100%);
      right: -60px;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 3px 2px -2px #123597;
    }
    .share4 {
      background-image: linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%);
      top: 90px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 0 3px 2px -2px #00E4FF;
    }
  }
`;
export {
  DetailWarp,
  Warp960
}
