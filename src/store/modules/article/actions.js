import {GET_HOT_LIST} from "./const";
import article from "../../../api/article";

const get_hot = (data) => ({
  type: GET_HOT_LIST,
  data
});
const get_hot_list = () => {
  return (dispatch) => {
    article.hotList().then((res) => {
      if (res.code === 200) {
        dispatch(get_hot(res.data))
      }
    })
  }
};

export {
  get_hot_list
}
