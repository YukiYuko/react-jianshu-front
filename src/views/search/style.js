import styled from 'styled-components';
import {grayBorderColor} from "../../assets/style/var";
const searchImg = require("../../assets/images/search.png");
const searchBg = require("../../assets/images/searchBg.jpg");

const Search = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  padding-bottom: 30px;
  .search-head {
    height: 400px;
    background: url("${searchBg}") no-repeat center;
    background-size: cover;
    position: relative;
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
  // 热门搜索
  .search__tag {
    color: #ffffff;
    margin-bottom: 20px;
    &__title {
      margin-bottom: 10px;
      color: #ffffff;
      -webkit-background-clip: text;
      font-size: 20px;
      text-shadow: rgba(0,0,0,0.2) 1px 1px 1px;
    }
    &__link {
      &__item {
        margin-bottom: 10px;
        margin-right: 10px;
        cursor: pointer;
        transition: 0.3s all ease;
        &:hover {
          color: #0da4d3;
        }
      }
    }
  } 
`;

export {
  Search
}
