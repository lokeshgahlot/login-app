
jest.mock("../../services/user.service", () => {});
import {Map} from "immutable";
import authenticationReducer from "../authentication.reducer";

import { AUTHENTICATION_FAILURE, AUTHENTICATION_SUCCESS } from "../../actions/authentication.actions";

describe ("authentication.reducer" , () => {
  afterAll(() => {
    jest.unmock("../../services/user.service");
  });

  it ("AUTHENTICATION_SUCCESS case ", () => {
    const state = new Map({
      isAuthenticated: false,
      token: undefined,
      id: undefined
    });
    const result = authenticationReducer(state, {
      type: AUTHENTICATION_SUCCESS,
      payload: {
        token: "jwt-token",
        id: "1234sdfs",
      }
    });
    expect(result.toJS()).toEqual({
      isAuthenticated: true,
      token: "jwt-token",
      id: "1234sdfs"
    });
  });

  it ("AUTHENTICATION_SUCCESS case ", () => {
    const state = new Map({
      isAuthenticated: true,
      token: undefined,
      id: undefined
    });
    const result = authenticationReducer(state, {
      type: AUTHENTICATION_FAILURE,
      payload: {
        token: "",
        id: "",
      }
    });
    expect(result.toJS()).toEqual({
      isAuthenticated: false,
      token: undefined,
      id: undefined
    });
  });

}); 