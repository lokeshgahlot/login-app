
import userReducer from "../user.reducer";
jest.mock("../../services/user.service", () => {});
import {AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE, AUTHENTICATION_REQUEST} from "../../actions/authentication.actions";
import {FETCH_USER_SUCCESS} from "../../actions/fetchUser.actions";
import {LOGOUT} from "../../actions/logout.actions";

describe ("user.reducer" , () => {
  afterAll(() => {
    jest.unmock("../../services/user.service");
  });
  it ("AUTHENTICATION_SUCCESS case ", () => {
    const result = userReducer(undefined, {
      type: AUTHENTICATION_SUCCESS,
      payload: {
        name: "Joe"
      }
    });
    expect(result.toJS()).toEqual({
      loading: false,
      name: "Joe"
    });
  });

  it ("FETCH_USER_SUCCESS case ", () => {
    const result = userReducer(undefined, {
      type: FETCH_USER_SUCCESS,
      payload: {
        name: "Joe"
      }
    });
    expect(result.toJS()).toEqual({
      loading: false,
      name: "Joe"
    });
  });

  it ("LOGOUT case ", () => {
    const result = userReducer(undefined, {
      type: LOGOUT
    });
    expect(result.toJS()).toEqual({
      loading: false
    });
  });

  it ("AUTHENTICATION_FAILURE case ", () => {
    const result = userReducer(undefined, {
      type: AUTHENTICATION_FAILURE
    });
    expect(result.toJS()).toEqual({
      loading: false
    });
  });

  it ("AUTHENTICATION_REQUEST case ", () => {
    const result = userReducer(undefined, {
      type: AUTHENTICATION_REQUEST
    });
    expect(result.toJS()).toEqual({
      loading: true
    });
  });

}); 