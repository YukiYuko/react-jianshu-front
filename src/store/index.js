import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import user from "./modules/user/reducers";
import article from "./modules/article/reducers";

const reducers = combineReducers({
    user,
    article
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;