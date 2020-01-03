import React from "react";
import {Icon} from "antd";
import {Link} from "react-router-dom";
import {AboutWrap} from "./style";
import "./style.scss";
import SuperMoon from "../../common/Weather/supermoon/index";

// import {NavLink} from "react-router-dom";

class About extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add("is-loading");
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      let rainbowText = Array.from(this.rainbow.getElementsByTagName("p"));
      rainbowText.forEach((item) => {
        let letters = item.textContent.split("");
        item.textContent = "";
        letters.forEach((letter, i) => {
          let span = document.createElement("span");
          span.textContent = letter;
          span.style.animationDelay = `${-20 + i * 0.2}s`;
          item.append(span);
        });
      });
    },100);
  }

  render() {
    return (
      <AboutWrap>
        <SuperMoon/>
        <header className="about">
          <div className="logo">
            <Icon type="smile" />
          </div>
          <div className="content">
            <div className="inner rainbow" ref={(ref) => this.rainbow = ref}>
              <h2>星白凛</h2>
              <p>
                一个切图仔。
              </p>
              <p>
                一个FF14er。
              </p>
              <p>
                一个LOLer。
              </p>
              <p>
                一个大龄单身二次元。（不，蕾姆是我老婆！永远喜欢金所泫.jpg）
              </p>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <span>
                  <Link to="/">博客首页</Link>
                </span>
              </li>
              <li>
                <span>
                  <b>番剧乐园</b>
                </span>
              </li>
              <li>
                <span>
                  <b>星白凛の实验室</b>
                </span>
              </li>

              <li>
                <span>
                  <Link to="/message">留言板</Link>
                </span>
              </li>
              <li>
                <span>
                  <b>更多功能</b>
                </span>
              </li>
            </ul>
          </nav>
        </header>
        <footer id="footer">
          <p className="copyright">©Yukiko</p>
        </footer>
      </AboutWrap>
    );
  }
}

export default About;
