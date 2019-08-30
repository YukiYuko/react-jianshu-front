import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
      box-sizing: border-box;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, p {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        position: relative;
    }
    ol, ul {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: #444;
    }
    em, i {
      font-style: normal;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    input {
        outline: none;
    }
    //input:-webkit-autofill {
    //  -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    //}
    img {
        vertical-align: middle;
        object-fit: cover;
    }
    .warp960, .warp1440, .warp1200 {
        position: relative;
        margin: auto;
        // inherit 属性 表示继承父级
        height: inherit;
    }
    .warp1200 {
        width: 1200px; 
    }
    .warp960 {
        width: 960px; 
    }
    .warp1440 {
        max-width: 1440px; 
    }
    .hover_img {
      position: relative;
      overflow: hidden;
      &:before {
        content: "";
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background-color: rgba(0,0,0,0.1);
        z-index: 1;
      }
      &:hover {
        img {
          transform: scale(1.2);
        }
      }
      img {
        transition: all 0.5s ease;
      }
    }
    .v-card {
      box-shadow: 0 0 4px 1px rgba(0,0,0,0.02);
    }
    ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      //background-color:#292929;
    }
    ::-webkit-scrollbar {//滚动条的宽度
      width:2px;
      height:9px;
    }
    ::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:#a9a9a9;
      background-clip:padding-box;
      min-height:28px;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color:#6e6e6e;
    }
    
    // -----------------------------------滚动指示器  不明白为什么不起作用
  .indicator {
    position: absolute;
    top: 0; right: 0; left: 0; bottom: 0;
    background: linear-gradient(to right top, teal 50%, transparent 50%) no-repeat;
    background-size: 100% calc(100% - 100vh);
    z-index: 1;
    pointer-events: none;
    mix-blend-mode: darken;
  }
  .indicator::after {
      content: '';
      position: fixed;
      top: 5px; bottom: 0; right: 0; left: 0;
      background: #fff;
      z-index: 1;
  }
  // -----------------------------------滚动指示器
  
  //  超出省略
  .ellipsis {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  
  .pd__top20 {
    padding-top: 20px;
  }
`;
