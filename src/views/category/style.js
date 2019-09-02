import styled from 'styled-components';
// import {grayBorderColor} from "../../assets/style/var";
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
