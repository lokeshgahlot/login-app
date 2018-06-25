import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Redirect, Link} from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel, ButtonToolbar} from "react-bootstrap";
import {connect} from "react-redux";
import {register} from "../../actions/register.actions";
import * as alertActions from "../../actions/alert.actions";
import WithInputValidator from "../WithInputValidator";
import "../../scss/form.scss";

export class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      redirectURL: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.success = this.success.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  validateForm() {
    return ( this.state.email.length > 0 
      && this.state.password.length > 0
      && this.state.name.length > 0
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  success() {
    const {showSuccessAlert, clearAlert} = this.props;
    this.setState({
      redirectURL: "/login"
    }, () => {
      showSuccessAlert("Registration Successful!!")
    });
  }

  handleSubmit(event) {
    const {history, register} = this.props;
    const {name, email, password} = this.state;

    register({ name, email, password})
      .then(this.success)
    event.preventDefault();
  }

  render() {
    const {redirectURL} = this.state;
    if (redirectURL.length) {
      return <Redirect to={{pathname: redirectURL}} />
    }

    return (
      <div className="registration-page top-buffer">
        <form className="form" onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl autoFocus type="text" required value={this.state.name} onChange={this.handleChange}/>
          </FormGroup>

            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <WithInputValidator>
                <FormControl type="email" required value={this.state.email} onChange={this.handleChange}/>
              </WithInputValidator>
            </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl value={this.state.password}onChange={this.handleChange}type="password"/>
          </FormGroup>
          
          <ButtonToolbar className="pull-right">
            <Link to={{pathname: "/login"}}>
              <Button bsSize="large"> Login</Button>
            </Link>
            <Button bsSize="large" bsStyle="primary" disabled={!this.validateForm()} type="submit"> Register </Button>
          </ ButtonToolbar>
        </form>
      </div>
    );
  }
}


RegistrationPage.propTypes = {
  register: PropTypes.func,
  alertSuccess: PropTypes.func
}

export default connect(null, {
  register,
  showSuccessAlert: alertActions.success,
  clearAlert: alertActions.clear
})(RegistrationPage);