import styled from "styled-components";
// import { grayBorderColor } from "../../assets/style/var";
const bg = require("../../assets/images/aboutBg.jpg");

const AboutWrap = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${bg}) no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-height: 100vh;
  padding: 4rem 2rem;
  z-index: 3;
  color: #ffffff;
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.325s ease-in-out, filter 0.325s ease-in-out,
      opacity 0.325s ease-in-out;
    /*background-image: -moz-radial-gradient(rgba(0, 0, 0, 0.25) 25%, transparent 55%);
		background-image: -webkit-radial-gradient(rgba(0, 0, 0, 0.25) 25%, transparent 55%);
		background-image: -ms-radial-gradient(rgba(0, 0, 0, 0.25) 25%, transparent 55%);
		background-image: radial-gradient(rgba(0, 0, 0, 0.25) 25%, transparent 55%); */
    max-width: 100%;
    text-align: center;
  }

  .about > * {
    transition: opacity 0.325s ease-in-out;
    position: relative;
    margin-top: 3.5rem;
  }

  .about > *:before {
    content: "";
    display: block;
    position: absolute;
    top: calc(-3.5rem - 1px);
    left: calc(50% - 1px);
    width: 1px;
    height: calc(3.5rem + 1px);
    background: #ffffff;
  }

  .about > :first-child {
    margin-top: 0;
  }

  .about > :first-child:before {
    display: none;
  }

  .about .logo {
    width: 5.5rem;
    height: 5.5rem;
    line-height: 5.5rem;
    border: solid 1px #ffffff;
    border-radius: 100%;
    font-size: 25px;
  }

  .about .logo .icon:before {
    font-size: 2rem;
  }

  .about .content {
    border-style: solid;
    border-color: #ffffff;
    border-top-width: 1px;
    border-bottom-width: 1px;
    max-width: 100%;
  }

  .about .content .inner {
    transition: max-height 0.75s ease, padding 0.75s ease,
      opacity 0.325s ease-in-out;
    transition-delay: 0.25s;
    padding: 3rem 2rem;
    max-height: 40rem;
    overflow: hidden;
    h2 {
      color: #ffffff;
      font-size: 26px;
    }
  }

  .about .content .inner > :last-child {
    margin-bottom: 0;
  }

  .about .content p {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    font-size: 0.8rem;
    line-height: 2;
  }

  .about nav ul {
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    margin-bottom: 0;
    list-style: none;
    padding-left: 0;
    border: solid 1px #ffffff;
    border-radius: 4px;
  }

  .about nav ul li {
    padding-left: 0;
    border-left: solid 1px #ffffff;
  }

  .about nav ul li:first-child {
    border-left: 0;
  }
  .about nav ul li a {
    color: #ffffff;
  }
  .about nav ul li span {
    display: block;
    min-width: 7.5rem;
    height: 2.75rem;
    line-height: 2.75rem;
    padding: 0 1.25rem 0 1.45rem;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    font-size: 0.8rem;
    border-bottom: 0;
    color: #ffffff;
  }

  .about nav ul li span:hover {
    background-color: rgba(255, 255, 255, 0.075);
  }

  .about nav ul li span:active {
    background-color: rgba(255, 255, 255, 0.175);
  }

  .about nav.use-middle:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: calc(50% - 1px);
    width: 1px;
    height: 100%;
    background: #ffffff;
  }

  .about nav.use-middle ul li.is-middle {
    border-left: 0;
  }

  @media screen and (max-width: 980px) {
    .about .content p br {
      display: none;
    }
  }

  @media screen and (max-width: 736px) {
    .about > * {
      margin-top: 2rem;
    }

    .about > *:before {
      top: calc(-2rem - 1px);
      height: calc(2rem + 1px);
    }

    .about .logo {
      width: 4.75rem;
      height: 4.75rem;
      line-height: 4.75rem;
    }

    .about .logo .icon:before {
      font-size: 1.75rem;
    }

    .about .content .inner {
      padding: 2.5rem 1rem;
    }

    .about .content p {
      line-height: 1.875;
    }
  }

  @media screen and (max-width: 480px) {
    .about {
      padding: 1.5rem 0;
    }

    .about .content .inner {
      padding: 2.5rem 0;
    }

    .about nav ul {
      flex-direction: column;
      min-width: 10rem;
      max-width: 100%;
    }

    .about nav ul li {
      border-left: 0;
      border-top: solid 1px #ffffff;
    }

    .about nav ul li:first-child {
      border-top: 0;
    }

    .about nav ul li span {
      height: 3rem;
      line-height: 3rem;
      min-width: 0;
      width: 100%;
    }

    .about nav.use-middle:after {
      display: none;
    }
  }
`;

export {AboutWrap};
