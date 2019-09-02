import { SET_CATE, SET_TAG_TYPE } from "./const";

const defaultState = {
  cate: "",
  tag_type: "text"
};

export default (state = {...defaultState}, action) => {
  switch (action.type) {
    case SET_CATE:
      return { ...state, ...action.param };
    case SET_TAG_TYPE:
      return { ...state, ...action.param };
    default:
      return state;
  }
};
