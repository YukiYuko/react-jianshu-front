import styled from 'styled-components';

const lineHeight = "58px";
const grayColor = "#969696";
const grayBackColor = "#eee";
const grayBorderColor = "#eee";


const HeadWarper = styled.div`
    height: 58px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 1;
`;
//
const Logo = styled.a`
    height: 100%;
    img{
      height: 100%;
    }
`;
//  导航
const Nav = styled.nav`
    line-height: ${lineHeight};
    a {
      padding: 0 15px;
      margin-right: 10px;
      color: #444;
      &.active {
        color: #ea6f5a;
      }
      &:hover {
        background-color: rgba(0,0,0,0.08);
      }
    }
`;
// 搜索
const InputBox = styled.div`
    margin-left: 20px;
    position: relative;
    > input {
        padding: 0 40px 0 20px;
        width: 200px;
        height: 38px;
        margin-top: 10px;
        font-size: 14px;
        border: 1px solid ${grayBorderColor};
        border-radius: 40px;
        background: ${grayBackColor};
        transition: all 0.3s ease-in-out;
        color: ${grayColor};
        &::placeholder {
          color: ${grayColor};
        }
        &:focus {
          width: 260px;
        }
        &:focus ~ i {
          background-color: rgba(0,0,0,0.6);
          color: #fff;
        }
    }
    > i {
        position: absolute;
        right: 15px;
        font-size: 18px;
        top: 15px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        text-align: center;
        line-height: 28px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
    }
    .hot-box{
      position: absolute;
      width: 250px;
      padding: 15px;
      height: auto;
      top: 100%;
      left: 0;
      box-shadow: 0 0 4px -2px rgba(0,0,0,0.4);
      background-color: #fff;
      &-head {
        color: ${grayColor};
        cursor: pointer;
        margin-bottom: 10px;
        i {
          margin-right: 5px;
          display: inline-block;
          transition: all ease-in-out 0.4s;
        }
      }
      &-list {
        &-item {
          padding: 3px 4px;
          border: 1px solid ${grayBorderColor};
          font-size: 10px;
          line-height: 1;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }
`;
// 登录注册
const LoginRegBox = styled.div`
    position: relative;
    right: 0;
    top: 0;
    height: 100%;
    .is_login {
      height: 100%;
      position: relative;
      .user_info {
        height: 100%;
        width: 120px;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
`;
// 登录
const Login = styled.div`
    line-height: ${lineHeight};
    a {
      color: ${grayColor};
      margin-right: 20px;
      cursor: pointer;
    }
`;
// 注册 和 写文章
const Reg = styled.div`
     a {
          margin-top: 10px;
          height: 38px;
          padding: 0 20px;
          line-height: 38px;
          border-radius: 20px;
          font-size: 15px;
          color: #ea6f5a;
          background-color: transparent;
          display: inline-block;
        &.reg {
          border: 1px solid rgba(236,97,73,.7);
          margin-right: 15px;
        }
        &.write {
          color: #fff;
          background-color: #ea6f5a;
        }
     }
`;
export {
  HeadWarper,
  Logo,
  Nav,
  InputBox,
  LoginRegBox,
  Login,
  Reg
}
