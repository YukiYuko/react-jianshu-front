import {GET_USER} from "./const";

const get_user = (param) => ({
    type: GET_USER,
    param
});

export {
    get_user
}