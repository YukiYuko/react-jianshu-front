import React from "react"
import {Logo} from "./style";
import LogoImage from "../../assets/images/logo.png";

const LogoComponent = () => (
    <Logo>
        <img src={LogoImage} alt="简书"/>
    </Logo>
);

export default LogoComponent