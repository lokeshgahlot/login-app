import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Alert} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {clear} from "../actions/alert.actions";

export class AppAlert extends React.Component {
  constructor(props) {
    super(props);
    const {history} = props;
    this.historyListener = this.historyListener.bind(this);
    history.listen(this.historyListener);
  }

  historyListener(location, action) {
    const {clearAlert} = this.props;
    clearAlert();
  }

  componentWillUnmount() {
    const {history} = this.props;
    history.unlisten(this.historyListener);
  }

  render() {
    // don't want to pass dispatch, staticContext, clearAlert into child component
    const {bsStyle, message, children, dispatch, staticContext, clearAlert, ...rest} = this.props;
    return (
      <React.Fragment>
        {
          message.length > 0 ? <Alert bsStyle={bsStyle} {...rest}>{message}</Alert> : null
        }
        {children}
      </React.Fragment>
    );
  }
}

AppAlert.propTypes = {
  bsStyle: PropTypes.string,
  message: PropTypes.string,
  clearAlert: PropTypes.func
};

AppAlert.defaultProps = {
  bsStyle: "danger",
  message: ""
};


export const mapSTP = (state) => ({
  bsStyle: state.get("alert").get("type"),
  message: state.get("alert").get("message")
});

//Added with withRouter because of the following reason 
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates
export default withRouter(
  connect(mapSTP, {clearAlert: clear})
  (AppAlert)
);



