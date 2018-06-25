import {register as registerService} from "../services/user.service";
import  * as alertActions from "./alert.actions";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const request = _ => ({ type: REGISTER_REQUEST });
export const success = user => ({ type: REGISTER_SUCCESS, user });
export const failure = error => ({ type: REGISTER_FAILURE, error });

export const register = payload => dispatch => {
  request();
  return new Promise((resolve, reject) => {
    registerService(payload)
    .then(user => { //success
      dispatch(success(user))
      resolve(user);
    })
    .catch(error => { // error
      dispatch(failure(error))
      dispatch(alertActions.failure(error));
      reject(error);
    });
  })
}