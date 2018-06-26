import React from "react";
import {shallow} from "enzyme";
import {RegistrationPage} from "../Registration";

describe("<RegistrationPage />", () => {
  it ("renders correctly", () => { 
    const wrapper = shallow(<RegistrationPage register={jest.fn()} 
      showSuccessAlert={jest.fn()}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it ("renders <Redirect>", () => { 
    const wrapper = shallow(<RegistrationPage />);
    wrapper.instance().setState({
      redirectURL: "/login"
    });
    expect(wrapper).toMatchSnapshot();
  });

  it ("calls register on form submit", (done) => {
    const mockRegister = jest.fn();
    const mockShowSuccessAlert = jest.fn();
    const promise = new Promise((resolve, reject) => resolve());
    mockRegister.mockReturnValue(promise);

    const wrapper = shallow(<RegistrationPage register={mockRegister} 
      showSuccessAlert={mockShowSuccessAlert}/>);
    const expected = {
      name: "Joe", 
      email: "joe@info.com", 
      password: "1234"
    };

    wrapper.instance().setState(expected);
    wrapper.find(".form").simulate("submit", {preventDefault: jest.fn()});
    expect(mockRegister.mock.calls.length).toBe(1);
    expect(mockRegister.mock.calls[0][0]).toEqual(expected);
    // Since setState is async
    // Should be better way to test this, For now setTimeout added
    setTimeout(_ => {
      expect(mockShowSuccessAlert.mock.calls.length).toBe(1);
      done();
    }, 50); // 0 should work, 50ms added just in case
  });
});