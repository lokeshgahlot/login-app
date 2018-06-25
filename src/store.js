import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import thunk from "redux-thunk";
import {Map} from "immutable";
import authenticationReducer from "./reducers/authentication.reducer";
import alert from "./reducers/alert.reducer";
import user from "./reducers/user.reducer";

const reducers = combineReducers({
  authenticationInfo: authenticationReducer,
  alert,
  user
});

export const store = createStore(reducers, applyMiddleware(thunk));
