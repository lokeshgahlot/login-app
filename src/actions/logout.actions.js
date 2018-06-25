import {COOKIE_KEY} from "./authentication.actions";
import Cookies from "cookies-js";

export const LOGOUT = "LOGOUT";

export const logout = () => {
  Cookies.expire(COOKIE_KEY);
  return {
    type: LOGOUT
  };
};