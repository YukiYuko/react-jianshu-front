import styled from 'styled-components';
// import {grayColor} from "../../assets/style/var";

const RegisterWrap = styled.div`
  box-shadow: 0 3px 8px -2px rgba(0, 0, 0, 0.2);
  width: 375px;
  height: 700px;
  background-image: linear-gradient(135deg, #7367F0 0%, #CE9FFC 100%);
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  z-index: 10;
  //animation: slideInLeft 0.3s ease-in-out;
  //transform: translateX(100%);
  .register {
    width: 100%;
    height: 100%;
    position: relative;
    &-box {
      min-height: 380px;
      padding: 0 20px;
      width: 100%;
    }
    .logo {
      width: 100px;
      margin-bottom: 30px;
    }
    .form {
      padding-right: 100px;
    }
    .form-submit {
      position: relative;
      top: 20px;
    }
    .login-btn {
      cursor: pointer;
      width: 60px;
      line-height: 60px;
      background: #fff;
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
      border: none;
      padding: 0;
      outline: none;
      position: absolute;
      right: 30px;
      bottom: 30px;
      z-index: 1;
      &.is-active {
        animation: shockwaveJump 1s ease-out infinite;
      }
      &.is-active:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        animation: shockwave 1s .65s ease-out infinite;
      }
      &.is-active:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        animation: shockwave 1s .5s ease-out infinite;
      }
    }
  }
  .big-block {
    width: 450px;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0 3px 8px -2px #7367F0;
    border-top-right-radius: 100px;
    position: absolute;
    transform: rotate(-45deg) translateX(-70px) translateY(-120px);
    bottom: 0;
  }
  .little-block {
    filter: blur(0.2px);
    width: 200px;
    height: 200px;
    position: absolute;
    box-shadow: 0 3px 8px -2px #7367F0;
    background-color: #ffffff;
    transform: translateY(15px) rotate(-45deg);
    right: 0;
    top: -140px;
    border-bottom-left-radius: 60px;
  }
  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    position: absolute;
    top: 30px;
    right: 80px;
    color: #3067fb;
    background-color: #ffffff;
    box-shadow: 0 3px 4px -2px #3067fb;
    animation: move 3s ease-in-out infinite alternate;
    &-text {
      line-height: 1;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -15px);
    }
  }
  @keyframes move {
    0% {        
      transform: translateY(0);
    } 100% {
      transform: translateY(10px);
    }
  }
  @keyframes shockwaveJump {
    0% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.08);
    }
    50% {
      transform: scale(0.98);
    }
    55% {
      transform: scale(1.02);
    }
    60% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes shockwave {
    0% {
      transform: scale(1);
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), inset 0 0 1px rgba(0, 0, 0, 0.15);
    }
    95% {
      box-shadow: 0 0 50px transparent, inset 0 0 30px transparent;
    }
    100% {
      transform: scale(2.25);
    }
  }
  @keyframes slideInLeft {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
export {
  RegisterWrap
}
