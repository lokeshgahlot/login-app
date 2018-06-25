import { ALERT_SUCCESS, ALERT_CLEAR, ALERT_FAILURE } from "../actions/alert.actions";
import {Map} from "immutable";

export default (state=new Map(), {type, payload}) => {
  switch(type) {
    case ALERT_SUCCESS:
      return state.set("type", "success").set("message", payload);
    case ALERT_CLEAR:
      return state.set("type", "").set("message", "");
    case ALERT_FAILURE: 
      return state.set("type", "danger").set("message", payload);
  }
  return state;
}