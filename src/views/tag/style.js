import styled from "styled-components";
import { grayBorderColor } from "../../assets/style/var";

const TagBg = require("../../assets/images/tags.png");

const Block = styled.div`
  .block {
    background-color: rgba(0, 0, 0, 0.1);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
    &-box {
      height: 200px;
      background: url(${TagBg}) top #505050;
      background-size: 150px;
      h3 {
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

export {
  Block
}
