import * as alertActions from "../alert.actions";

describe("alert.actions", () => {
  it ("clear()", () => {
    expect(alertActions.clear()).toMatchSnapshot();
  });

  it ("success()", () => {
    expect(alertActions.success("Alert success!!")).toMatchSnapshot();
  });

  it ("failure()", () => {
    expect(alertActions.failure("Alert failure!!")).toMatchSnapshot();
  });
});