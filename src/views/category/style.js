import styled from 'styled-components';
// import {grayColor} from "../../assets/style/var";
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
    background-color: #ffffff;
  }
`;

export {
  Category
}
