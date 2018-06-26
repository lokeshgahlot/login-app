import * as authenticationActions from "../authentication.actions";

describe("authentication.actions", () => {
  it ("request()", () => {
    expect(authenticationActions.request()).toMatchSnapshot();
  });

  it ("success()", () => {
    expect(authenticationActions.success("success!!")).toMatchSnapshot();
  });

  it ("failure()", () => {
    expect(authenticationActions.failure("failure!!")).toMatchSnapshot();
  });  
});