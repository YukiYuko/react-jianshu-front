import {GET_USER, SET_USER} from "./const";

const get_user = (param) => ({
  type: GET_USER,
  param
});
const set_user = (param) => {
  // console.log("param", param);
  return {
    type: SET_USER,
    param
  }
};

export {
  get_user,
  set_user
}
