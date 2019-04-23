import {createGlobalStyle} from 'styled-components';

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
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: #444;
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
    .warp960, .warp1440 {
        position: relative;
        margin: auto;
        // inherit 属性 表示继承父级
        height: inherit;
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
      &:hover {
        img {
          transform: scale(1.2);
        }
      }
      img {
        transition: all 0.5s ease;
      }
    }
`;
