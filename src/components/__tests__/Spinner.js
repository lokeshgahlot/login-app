import React from "react";
import {shallow} from "enzyme"
import Spinner from "../Spinner";

describe("<Spinner />", () => {
  it ("renders correctly", () => {
  const wrapper = shallow(<Spinner size="64px" color="#ffffff" />);
    expect(wrapper).toMatchSnapshot();
  });
});