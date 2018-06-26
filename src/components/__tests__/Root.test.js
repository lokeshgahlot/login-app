import React from "react";
import {shallow} from "enzyme";
import configureStore from "redux-mock-store";
import Root from "../Root";

describe("<Root />", () => {
  it ("renders correctly", () => {
    const mockStore = configureStore([]); //  configureStore(middlewares)
    const store = mockStore({}); // mockStore(initialState)
    const wrapper = shallow(<Root store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});