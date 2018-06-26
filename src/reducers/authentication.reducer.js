import { AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE, COOKIE_KEY } from "../actions/authentication.actions";
import { LOGOUT } from "../actions/logout.actions";
import Cookies from "cookies-js";
import {Map} from "immutable";

const cookiesValue = Cookies.get(COOKIE_KEY);
const parsedCookies = cookiesValue && JSON.parse(cookiesValue);

const initialState = new Map({
  isAuthenticated: !!cookiesValue,
  ...parsedCookies
});

export default (state=initialState , {type, payload}) => {  
  switch (type) {
  case AUTHENTICATION_SUCCESS:
    return state
      .set("isAuthenticated", true)
      .set("token", payload.token)
      .set("id", payload.id);
  case LOGOUT:
  case AUTHENTICATION_FAILURE:
    return state
      .set("isAuthenticated", false)
      .set("token", undefined)
      .set("id", undefined);
  }
  return state;
};