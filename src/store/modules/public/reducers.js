import { SET_CATE } from "./const";

const defaultState = {
  cate: ""
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CATE:
      return { ...state, ...action.param };
    default:
      return state;
  }
};
