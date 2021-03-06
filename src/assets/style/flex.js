import {createGlobalStyle} from "styled-components";
export default createGlobalStyle`
    .flex,[flex],[flex] * {
      box-sizing:border-box
    }
    .flex,[flex] {  display:-webkit-flex;  display:flex  }
    .box1,[box="1"] { -webkit-flex:1;  flex:1  }
    .box2,[box="2"] {  -webkit-flex:2;  flex:2 }
    .box3,[box="3"] {  -webkit-flex:3;  flex:3  }
    .box4,[box="4"] {  -webkit-flex:4;  flex:4  }
    .box5,[box="5"] {  -webkit-flex:5;  flex:5  }
    .box6,[box="6"] {  -webkit-flex:6;  flex:6  }
    .box7,[box="7"] {  -webkit-flex:7;  flex:7  }
    .box8,[box="8"] {  -webkit-flex:8;  flex:8  }
    .box9,[box="9"] {  -webkit-flex:9;  flex:9  }
    .box10,[box="10"] {  -webkit-flex:10;  flex:10  }
    .dir-row,[dir=row] {  flex-direction:row;  -webkit-flex-direction:row  }
    .dir-row-reverse,[dir=row-reverse] {  flex-direction:row-reverse;  -webkit-flex-direction:row-reverse  }
    .dir-column,[dir=column] {
      flex-direction:column;
      -webkit-flex-direction:column
    }
    .dir-column-reverse,[dir=column-reverse] {
      flex-direction:column-reverse;
      -webkit-flex-direction:column-reverse
    }
    .wrap-nowrap,[wrap=nowrap] {
      flex-wrap:nowrap;
      -webkit-flex-wrap:nowrap
    }
    .wrap-wrap,[wrap=wrap] {
      flex-wrap:wrap;
      -webkit-flex-wrap:wrap
    }
    .wrap-wrap-reverse,[wrap=wrap-reverse] {
      flex-wrap:wrap-reverse;
      -webkit-flex-wrap:wrap-reverse
    }
    .justify-start,[justify=start] {
      justify-content:flex-start;
      -webkit-justify-content:flex-start
    }
    .justify-end,[justify=end] {
      justify-content:flex-end;
      -webkit-justify-content:flex-end
    }
    .justify-center,[justify=center] {
      justify-content:center;
      -webkit-justify-content:center
    }
    .justify-between,[justify=between] {
      justify-content:space-between;
      -webkit-justify-content:space-between
    }
    .justify-around,[justify=around] {
      justify-content:space-around;
      -webkit-justify-content:space-around
    }
    .align-start,[align=start] {
      align-content:flex-start;
      -webkit-align-content:flex-start
    }
    .align-end,[align=end] {
      align-content:flex-end;
      -webkit-align-content:flex-end
    }
    .align-center,[align=center] {
      align-content:center;
      -webkit-align-content:center
    }
    .align-between,[align=between] {
      align-content:space-between;
      -webkit-align-content:space-between
    }
    .align-around,[align=around] {
      align-content:space-around;
      -webkit-align-content:space-around
    }
    .align-stretch,[align=stretch] {
      align-content:stretch;
      -webkit-align-content:stretch
    }
    .items-start,[items=start] {
      align-items:flex-start;
      -webkit-align-items:flex-start
    }
    .items-end,[items=end] {
      align-items:flex-end;
      -webkit-align-items:flex-end
    }
    .items-center,[items=center] {
      align-items:center;
      -webkit-align-items:center
    }
    .items-baseline,[items=baseline] {
      align-items:baseline;
      -webkit-align-items:baseline
    }
    .items-stretch,[items=stretch] {
      align-items:stretch;
      -webkit-align-items:stretch
    }
    .order0,[order="0"] {
      order:0;
      -webkit-order:0
    }
    .order1,[order="1"] {
      order:1;
      -webkit-order:1
    }
    .order2,[order="2"] {
      order:2;
      -webkit-order:2
    }
    .order3,[order="3"] {
      order:3;
      -webkit-order:3
    }
    .order4,[order="4"] {
      order:4;
      -webkit-order:4
    }
    .order5,[order="5"] {
      order:5;
      -webkit-order:5
    }
    .order6,[order="6"] {
      order:6;
      -webkit-order:6
    }
    .order7,[order="7"] {
      order:7;
      -webkit-order:7
    }
    .order8,[order="8"] {
      order:8;
      -webkit-order:8
    }
    .order9,[order="9"] {
      order:9;
      -webkit-order:9
    }
    .order10,[order="10"] {
      order:10;
      -webkit-order:10
    }
    .grow0,[grow="0"] {
      flex-grow:0;
      -webkit-flex-grow:0
    }
    .grow1,[grow="1"] {
      flex-grow:1;
      -webkit-flex-grow:1
    }
    .grow2,[grow="2"] {
      flex-grow:2;
      -webkit-flex-grow:2
    }
    .grow3,[grow="3"] {
      flex-grow:3;
      -webkit-flex-grow:3
    }
    .grow4,[grow="4"] {
      flex-grow:4;
      -webkit-flex-grow:4
    }
    .grow5,[grow="5"] {
      flex-grow:5;
      -webkit-flex-grow:5
    }
    .grow6,[grow="6"] {
      flex-grow:6;
      -webkit-flex-grow:6
    }
    .grow7,[grow="7"] {
      flex-grow:7;
      -webkit-flex-grow:7
    }
    .grow8,[grow="8"] {
      flex-grow:8;
      -webkit-flex-grow:8
    }
    .grow9,[grow="9"] {
      flex-grow:9;
      -webkit-flex-grow:9
    }
    .grow10,[grow="10"] {
      flex-grow:10;
      -webkit-flex-grow:10
    }
    .shrink0,[shrink="0"] {
      flex-shrink:0;
      -webkit-flex-shrink:0
    }
    .shrink1,[shrink="1"] {
      flex-shrink:1;
      -webkit-flex-shrink:1
    }
    .shrink2,[shrink="2"] {
      flex-shrink:2;
      -webkit-flex-shrink:2
    }
    .shrink3,[shrink="3"] {
      flex-shrink:3;
      -webkit-flex-shrink:3
    }
    .shrink4,[shrink="4"] {
      flex-shrink:4;
      -webkit-flex-shrink:4
    }
    .shrink5,[shrink="5"] {
      flex-shrink:5;
      -webkit-flex-shrink:5
    }
    .shrink6,[shrink="6"] {
      flex-shrink:6;
      -webkit-flex-shrink:6
    }
    .shrink7,[shrink="7"] {
      flex-shrink:7;
      -webkit-flex-shrink:7
    }
    .shrink8,[shrink="8"] {
      flex-shrink:8;
      -webkit-flex-shrink:8
    }
    .shrink9,[shrink="9"] {
      flex-shrink:9;
      -webkit-flex-shrink:9
    }
    .shrink10,[shrink="10"] {
      flex-shrink:10;
      -webkit-flex-shrink:10
    }
    .self-auto,[self=auto] {
      align-self:auto;
      -webkit-align-self:auto
    }
    .self-start,[self="start"] {
      align-self:flex-start;
      -webkit-align-self:flex-start
    }
    .self-end,[self="end"] {
      align-self:flex-end;
      -webkit-align-self:flex-end
    }
    .self-center,[self=center] {
      align-self:center;
      -webkit-align-self:center
    }
    .self-baseline,[self=baseline] {
      align-self:baseline;
      -webkit-align-self:baseline
    }
    .self-stretch,[self=stretch] {
      align-self:stretch;
      -webkit-align-self:stretch
    }
`;