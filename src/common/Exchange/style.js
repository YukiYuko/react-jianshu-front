import styled from 'styled-components';
import {grayColor} from "../../assets/style/var";

export const Exchange = styled.div`
    display: inline-block;
    cursor: pointer;
    i, span {
        vertical-align: middle;
        color: ${grayColor};
    }
    i {
        font-size: 20px;
        margin-right: 5px;
        transition: all ease-in-out 0.4s;
        display: inline-block;
    }
`;
