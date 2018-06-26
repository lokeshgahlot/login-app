import React from "react";
import {Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={ props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool
}

export const mapSTP = state => ({
    isAuthenticated: state.get("authenticationInfo").get("isAuthenticated")
})

//Added with withRouter because of the following reason 
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
export default withRouter(connect(mapSTP)(PrivateRoute));

