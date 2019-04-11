import {GET_USER, SET_USER} from "./const";

const defaultState = {
  username: "钟成"
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER:
      const new_state = {
        username: "Yuki"
      };
      return new_state;
    case SET_USER:
      return { ...state, ...action.param};
    default:
      return state;
  }
}
