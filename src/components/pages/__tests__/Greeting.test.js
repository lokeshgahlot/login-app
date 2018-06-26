import React from "react";
import {shallow} from "enzyme";
import {GreetingPage, mapSTP} from "../Greeting";
import {fromJS} from "immutable";

describe("<GreetingPage />", () => {
  it ("renders spinner", () => {
    const wrapper = shallow(<GreetingPage />);
    expect(wrapper).toMatchSnapshot();
  });

  it ("calls fetchUser()", () => {
    const fn = jest.fn();
    shallow(<GreetingPage fetchUser={fn} userId="1234"/>);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe("1234");
  });

  it ("renders greeting page", () => { 
    const wrapper = shallow(<GreetingPage name="Joe"/>);
    expect(wrapper).toMatchSnapshot();
  });

  it ("renders logout()", () => { 
    const fn = jest.fn();
    const wrapper = shallow(<GreetingPage name="Joe" logout={fn}/>);
    wrapper.find(".logout-btn").simulate("click");
    expect(fn.mock.calls.length).toBe(1);
  });

  it("mapSTP()",() => {
    const state = fromJS({
      user: {
        name: "Joe"
      }, 
      authenticationInfo: {
        id: "1234"
      }
    });
    expect(mapSTP(state)).toEqual({name: "Joe", userId: "1234"});
  });

});