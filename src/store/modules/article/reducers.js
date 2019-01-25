import {GET_HOT_LIST} from "./const";

const defaultState = {
    hotList: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_HOT_LIST:
            let new_state = {
              hotList: [...action.data]
            };
            return new_state;
        default:
            return state;
    }
}