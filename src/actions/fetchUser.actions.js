import {getUser} from "../services/user.service";
import {failure} from "./alert.actions";

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const success = (payload) => ({type: FETCH_USER_SUCCESS, payload});

export const fetchUser = payload => dispatch => {
  return getUser(payload)
    .then(data => dispatch(success(data)))
    /* eslint-disable */
    .catch(error => dispatch(failure(error)));
    /* eslint-enable */
};