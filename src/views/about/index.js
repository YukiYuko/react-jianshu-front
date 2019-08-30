import React from "react";
import { Icon } from "antd";
import { AboutWrap } from "./style";
import "./style.less";
import { Round_item } from "./point";
import SuperMoon from "../../common/Weather/supermoon/index";
// import {NavLink} from "react-router-dom";

class About extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add("is-loading");
    setTimeout(() => {
      document.body.classList.remove("is-loading");
    },100)
  }

  ball() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let WIDTH = document.documentElement.clientWidth;
    let HEIGHT = document.documentElement.clientHeight;
    let initRoundPopulation = 80;
    let round = [];
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    function animate() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      for (let i in round) {
        round[i].move(HEIGHT);
      }
      requestAnimationFrame(animate);
    }

    function init() {
      for (let i = 0; i < initRoundPopulation; i++) {
        round[i] = new Round_item(
          i,
          Math.random() * WIDTH,
          Math.random() * HEIGHT,
          ctx
        );
        round[i].draw();
      }
      animate();
    }

    init();
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
            <div className="inner">
              <h2>星白凛</h2>
              <b>
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
                  一个大龄单身二次元。（不，蕾姆是我老婆！）
                </p>
              </b>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <span>
                  <b>博客首页</b>
                </span>
              </li>
              <li>
                <span>
                  <b>番剧乐园</b>
                </span>
              </li>
              <li>
                <span>
                  <b>凤凰院凶真の实验室</b>
                </span>
              </li>

              <li>
                <span>
                  <b>留言板</b>
                </span>
              </li>
              <li>
                <span>
                  <b>下载壁纸</b>
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
