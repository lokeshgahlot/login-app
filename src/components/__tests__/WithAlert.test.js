import React from "react";
import {shallow} from "enzyme"
import {fromJS} from "immutable";
import {AppAlert, mapSTP} from "../WithAlert";

describe("<App />", () => {
  let mockHistory;
  beforeEach(() => {
    mockHistory = {
      listen: jest.fn()
    }
  });

  afterEach(() => {
    mockHistory.listen.mockClear();
    mockHistory = undefined;
  });

  it ("renders without alert", () => {
    const wrapper = shallow(
      <AppAlert history={mockHistory}>
        <span>hello</span>
      </AppAlert>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it ("renders with alert", () => {
    const wrapper = shallow(
      <AppAlert history={mockHistory} message="Test alert!!" bsStyle="info">
        <span>hello</span>
      </AppAlert>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it ("adds history listener", () => {
    const wrapper = shallow(
      <AppAlert history={mockHistory}>
        <span>hello</span>
      </AppAlert>
    );
    const instance = wrapper.instance();
    expect(mockHistory.listen.mock.calls.length).toBe(1);
    // listener function
    expect(mockHistory.listen.mock.calls[0][0]).toEqual(instance.historyListener);
  });

  it ("AppAlert.historyListener() calls clearAlert()", () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <AppAlert history={mockHistory} clearAlert={fn}>
        <span>hello</span>
      </AppAlert>
    );
    const instance = wrapper.instance();
    instance.historyListener();
    expect(fn.mock.calls.length).toBe(1);
  });

  it ("mapSTP()", () => {
    const state = fromJS({
      alert: {
        type: "info",
        message: "Test Alert!!"
      }
    });
    expect(mapSTP(state)).toEqual({
      bsStyle: "info",
      message: "Test Alert!!"
    });
  });

});