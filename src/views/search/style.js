import styled from 'styled-components';
import {grayBorderColor} from "../../assets/style/var";
const searchImg = require("../../assets/images/search.png");
const searchBg = require("../../assets/images/searchBg.jpg");

const Search = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 30px;
  .search-head {
    height: 300px;
    background: url("${searchBg}") no-repeat center;
    background-size: cover;
    position: relative;
    margin-bottom: 20px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.4);
    }
  }
  .search__container {
    width: 420px;
    margin: 0 auto;
    position: relative;
    padding-top: 130px;
  }
  // 搜索框
  .search__input {
    margin-bottom: 20px;
    width: 100%;
    padding: 12px 24px;
    position: relative;
    background-color: transparent;
    font-size: 14px;
    line-height: 18px;
    color: #fff;
    background-image: url(${searchImg});
    background-repeat: no-repeat;
    background-size: 26px 26px;
    background-position: 95% center;
    border-radius: 50px;
    border: 1px solid #fff;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
  .search__input::placeholder {
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
  .search__input:hover,
  .search__input:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    background-position: 100% center;
  }
  // 搜索历史
  .search-history {
    min-height: 800px;
  }
  // 最近搜搜
  .search-latest {
    &-item {
      padding: 0 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 10px;
      &:hover {
        background-color: rgb(202,202,202);
        color: #ffffff;
      }
      i {
        font-size: 25px;
      }
    }
  }
  // 搜索列表
  .search-list {
    &-item {
      background-color: #ffffff;
      margin-bottom: 15px;
      transition: all 0.2s ease;
      &:hover {
        box-shadow: 0 0 6px rgba(0,0,0,0.03);
      }
      &-img {
        height: 315px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        white-space: nowrap;
        padding: 15px 15px 0;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          text-indent: 20px;
        }
      }
      &-desc {
        font-size: 14px;
        color: #666;
        line-height: 24px;
        padding: 10px 15px;
      }
      &-msg {
        border-top: 1px solid ${grayBorderColor};
        padding: 10px 20px;
        line-height: 25px;
        font-size: 13px;
        color: #888;
        .label {
          width: 300px;
        }
        .line {
          height: 20px;
          width: 1px;
          background: #e6e6e6;
          float: left;
          margin-top: 3px;
        }
        .label {
          i {
            margin-right: 5px;
          }
          a {
            margin-right: 10px;
          }
        }
        .comments {
          i {
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export {
  Search
}
