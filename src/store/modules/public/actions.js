import { GET_CATE, SET_CATE, SET_TAG_TYPE } from "./const";

// 设置当前文章类别
const set_cate = param => {
  return {
    type: SET_CATE,
    param
  };
};
const set_tag_type = param => {
  return {
    type: SET_TAG_TYPE,
    param
  };
};
// 获取当前文章类别
const get_cate = param => ({
  type: GET_CATE,
  param
});

export { set_cate, get_cate, set_tag_type };
