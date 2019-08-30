import styled from "styled-components";
// import { grayBorderColor, grayColor } from "../../assets/style/var";

export const MessageContainer = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  .message__head {
    padding: 30px 0;
    border-radius: 3px 3px 3px 3px;
    margin-bottom: 20px;
    background-color: #222;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 7px,
      rgba(0, 0, 0, 0.8) 9px,
      rgba(0, 0, 0, 0.8) 13px,
      transparent 13px
    );
  }
`;
