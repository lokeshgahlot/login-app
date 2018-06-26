import React from "react";
import {shallow} from "enzyme";
import WithInputVaildator from "../WithInputValidator";

describe("<WithInputVaildator />", () => {
  const message = "Invalid email";
  // Todo: Couldn't better way to test this scenario
  //Skipping for now 
  it.skip ("should throw Error when zero or more than one children", () => {
    // const wrapper = shallow(
    //   <WithInputVaildator>
    //     <input />
    //     <span>hello</span>
    //   </WithInputVaildator>
    // );
    // expect(wrapper).toThrow(new Error("<WithEmailVaildator /> should have one child only!"));
  });

  it ("renders correctly", () => {
    const wrapper = shallow(
      <WithInputVaildator>
        <input />
      </WithInputVaildator>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it ("calls onChange", () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <WithInputVaildator>
        <input className="custom-input" onChange={fn}/>
      </WithInputVaildator>
    );
    wrapper.find(".custom-input").simulate("change", {
      target: {
        value: "test"
      }
    });
    expect(fn.mock.calls.length).toBe(1);
  });

  it ("onChange() calls setCustomValidity", () => {
    const fn = jest.fn();
    const mockSetCustomValidity = jest.fn();
    const wrapper = shallow(
      <WithInputVaildator>
        <input className="custom-input" onChange={fn}/>
      </WithInputVaildator>
    );
    wrapper.find(".custom-input").simulate("change", {
      target: {
        value: "test@test.com",
        setCustomValidity: mockSetCustomValidity
      }
    });
    expect(mockSetCustomValidity.mock.calls[0][0]).toBe("");

    mockSetCustomValidity.mockClear();
    wrapper.find(".custom-input").simulate("change", {
      target: {
        value: "test@test",
        setCustomValidity: mockSetCustomValidity
      }
    });
    expect(mockSetCustomValidity.mock.calls[0][0]).toBe(message);
  });

  it ("calls onInvalid", () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <WithInputVaildator>
        <input className="custom-input" onInvalid={fn}/>
      </WithInputVaildator>
    );
    wrapper.find(".custom-input").simulate("invalid", {target: {}});
    expect(fn.mock.calls.length).toBe(1);
  });

  it ("onInvalid() calls setCustomValidity", () => {
    const fn = jest.fn();
    const mockSetCustomValidity = jest.fn();
    const wrapper = shallow(
      <WithInputVaildator>
        <input className="custom-input" onInvalid={fn}/>
      </WithInputVaildator>
    );
    wrapper.find(".custom-input").simulate("invalid", {
      target: {
        setCustomValidity: mockSetCustomValidity
      }
    });
    expect(mockSetCustomValidity.mock.calls[0][0]).toBe(message);
  });
});