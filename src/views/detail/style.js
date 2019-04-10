import styled from 'styled-components';
import {grayColor} from "../../assets/style/var";

const Warp960 = styled.div`
  max-width: 960px;
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
`;
export {
  DetailWarp,
  Warp960
}
