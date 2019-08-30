import styled from 'styled-components';
import {grayBorderColor} from "../../assets/style/var";
const Category = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-bottom: 30px;
  .category-head {
    height: 300px;
    margin-bottom: 20px;
    //background-color: #61dafb;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .category-body {
    background-color: #ffffff;
  }
  .category-side {
    //background-color: #ffffff;
    .label {
      &-item {
        padding: 3px 5px;
        border: 1px solid ${grayBorderColor};
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;
        span {
          position: relative;
          z-index: 2;
        }
        &:before {
          position: absolute;
          content: '';
          width: 0;
          height: 100%;
          transition: 0.4s all ease;
          background: #F27059;
          left: 0;
          top: 0;
          z-index: -1;
        }
        &:hover {
          color: white;
          border-color: #F27059;
        }
        &:hover:before {
          width: 100%;
          transition: 0.4s all ease;
          z-index: 1;
        }
      }
    }
  }
  .one {
    &-title {
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
    }
    &-author {
      font-size: 14px;
      text-align: center;
      color: #999;
      margin-bottom: 10px;
    }
    &-digest {
      text-indent: 20px;
      line-height: 20px;
    }
  }
`;

export {
  Category
}
