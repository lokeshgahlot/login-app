import {authentication as  authenticationService} from "../services/user.service";
import Cookies from "cookies-js";
import  * as alertActions from "./alert.actions";

export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE";
export const COOKIE_KEY = "login-demo-app";

export const request = _ => ({ type: AUTHENTICATION_REQUEST });
export const success = payload => ({ type: AUTHENTICATION_SUCCESS, payload });
export const failure = payload => ({ type: AUTHENTICATION_FAILURE, payload });

export const authentication = payload => dispatch => {
  request();
  return new Promise((resolve, reject) => {
    authenticationService(payload)
      .then(user => { // success
        dispatch(success(user));
        if (user.token) {
          Cookies.set(COOKIE_KEY, JSON.stringify({token: user.token, id: user.id }), { expires: 60 * 60 * 24 }); // Expires in 1 day
        }
        resolve(user);
        return user;
      })
      /* eslint-disable */
      .catch(error => { // error
      /* eslint-enable */
        dispatch(failure(error));
        dispatch(alertActions.failure(error));
        reject(error);
        return error;
      });
  });
};