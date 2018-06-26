import {Map} from "immutable";
import {AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE, AUTHENTICATION_REQUEST} from "../actions/authentication.actions";
import {FETCH_USER_SUCCESS} from "../actions/fetchUser.actions";
import {LOGOUT} from "../actions/logout.actions";

export default (state=new Map(), {type, payload}) => {
  switch (type) {
  case FETCH_USER_SUCCESS:
  case AUTHENTICATION_SUCCESS:
    return new Map({...payload, loading: false}); 
  case LOGOUT:
  case AUTHENTICATION_FAILURE:
    return new Map({loading: false}); 
  case AUTHENTICATION_REQUEST:
    return new Map({loading: true}); 
  }
  return state;
};