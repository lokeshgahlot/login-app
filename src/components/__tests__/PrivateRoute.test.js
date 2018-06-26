import React from "react";
import {shallow} from "enzyme"
import {fromJS} from "immutable";
import {PrivateRoute, mapSTP} from "../PrivateRoute";

describe("<PrivateRoute />", () => {
  it ("renders with component", () => {
    const wrapper = shallow(
      <PrivateRoute  isAuthenticated={true} path="/greeting">
        <div>Test Component</div>
      </PrivateRoute>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it ("renders with <Redirect>", () => {
    const wrapper = shallow(<PrivateRoute  isAuthenticated={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it ("mapSTP()", () => {
    let state = fromJS({
      authenticationInfo: {
        isAuthenticated: true
      }
    });
    expect(mapSTP(state)).toEqual({isAuthenticated: true});
    
    state = fromJS({
      authenticationInfo: {
        isAuthenticated: false
      }
    });
    expect(mapSTP(state)).toEqual({isAuthenticated: false});
  });
});