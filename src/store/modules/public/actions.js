import { GET_CATE, SET_CATE } from "./const";

// 设置当前文章类别
const set_cate = param => {
  return {
    type: SET_CATE,
    param
  };
};
// 获取当前文章类别
const get_cate = param => ({
  type: GET_CATE,
  param
});

export { set_cate, get_cate };
