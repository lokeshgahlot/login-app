import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Redirect, Link} from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel, ButtonToolbar, Alert} from "react-bootstrap";
import WithInputValidator from "../WithInputValidator";
import {connect} from "react-redux";
import {authentication} from "../../actions/authentication.actions";
import Spinner from "../Spinner";
import "../../scss/form.scss";

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      alertMsg: "",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    const {authentication} = this.props;
    const {email, password} = this.state;
    authentication({email, password});
    event.preventDefault();
  }

  render() {
    const {isAuthenticated} = this.props;
    if (isAuthenticated) {
      return <Redirect to={{ pathname: "/greeting", state: { from: this.props.location }}}/>
    }

    return (
      <div className="login top-buffer">
        <form className="form" onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <WithInputValidator>
              <FormControl
                autoFocus
                type="email"
                required
                value={this.state.email}
                onChange={this.handleChange}
              /> 
            </WithInputValidator>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          
            <ButtonToolbar className="pull-right">
            <Link to={{pathname: "/sign-up"}}>
              <Button bsSize="large"> Register </Button>
            </Link>
            <Button
              bsSize="large"
              bsStyle="primary"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </ ButtonToolbar>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  authentication: PropTypes.func
}

const mapSTP = (state) => ({
  isAuthenticated: state.get("authenticationInfo").get("isAuthenticated")
});

export default connect(mapSTP, {
  authentication
})(LoginPage);