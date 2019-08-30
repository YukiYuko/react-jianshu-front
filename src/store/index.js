import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./modules/user/reducers";
import article from "./modules/article/reducers";
import pub from "./modules/public/reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};
const reducers = combineReducers({
  user,
  article,
  pub
});
const persistedReducer = persistReducer(persistConfig, reducers);

// const store = createStore(persistedReducer, applyMiddleware(thunk));
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
export { store, persistor }
