import React from "react";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import Routes from "../routes";

const Root = ({ store }) => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
