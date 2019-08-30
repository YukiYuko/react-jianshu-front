import React from "react"
import {Logo} from "./style";
import LogoImage from "../../assets/images/logo.png";
import {Link} from "react-router-dom";

const LogoComponent = () => (
    <Logo>
        <Link to="/">
          <img src={LogoImage} alt="简书"/>
        </Link>
    </Logo>
);

export default LogoComponent
