
import alertReducer from "../alert.reducer";
import { ALERT_SUCCESS, ALERT_CLEAR, ALERT_FAILURE } from "../../actions/alert.actions";

describe ("alert.reducer" , () => {
  it ("ALERT_SUCCESS case ", () => {
    const result = alertReducer(undefined, {
      type: ALERT_SUCCESS,
      payload: "Hello"
    });
    expect(result.toJS()).toEqual({
      message: "Hello",
      type: "success"
    });
  });

  it ("ALERT_CLEAR case ", () => {
    const result = alertReducer(undefined, {
      type: ALERT_CLEAR,
      payload: ""
    });
    expect(result.toJS()).toEqual({
      message: "",
      type: ""
    });
  });


  it ("ALERT_FAILURE case ", () => {
    const result = alertReducer(undefined, {
      type: ALERT_FAILURE,
      payload: "Hello"
    });
    expect(result.toJS()).toEqual({
      message: "Hello",
      type: "danger"
    });
  });

}); 