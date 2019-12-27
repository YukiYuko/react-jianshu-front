import React from "react"
import {Logo} from "./style";
import LogoImage from "../../assets/images/logo.png";
import {Link} from "react-router-dom";

const LogoComponent = () => (
    <Logo>
        <Link to="/">
          <img src={LogoImage} alt="Yuki-雪落下的声音"/>
        </Link>
    </Logo>
);

export default LogoComponent
