import React from "react";
import {shallow} from "enzyme"
import {LoginPage, mapSTP} from "../Login";
import {fromJS} from "immutable";

describe("<LoginPage />", () => { 
  it ("renders correctly", () => {
    const wrapper = shallow(<LoginPage isAuthenticated={false}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it ("redirects", () => {
    const wrapper = shallow(<LoginPage isAuthenticated={true}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it ("calls authentication on form submit", () => {
    const fn = jest.fn();
    const wrapper = shallow(<LoginPage isAuthenticated = {false} authentication={fn}/>);
    const instance = wrapper.instance();
    const expectedResult = {
      email: "test@test.com", 
      password: "test"
    }
    instance.setState(expectedResult);
    wrapper.find(".form").simulate("submit", {preventDefault: () => {}});
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toEqual(expectedResult);
  });

  it ("mapSTP()", () => {
    const state = fromJS({
      authenticationInfo: {
        isAuthenticated: true
      }
    });
    expect(mapSTP(state)).toEqual({isAuthenticated: true});
  });

});