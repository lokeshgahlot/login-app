import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Jumbotron, Button, ButtonToolbar} from "react-bootstrap";
import Spinner from "../Spinner";
import {logout} from "../../actions/logout.actions";
import {fetchUser} from "../../actions/fetchUser.actions"

export const GreetingPage = ({name, userId, logout, fetchUser}) => {
  if (!name) {
    fetchUser && fetchUser(userId);
    return (
      <div className="col-xs-offset-5">
        <Spinner size="64px"/>
      </div>
    )
  }
  return (
    <Jumbotron>
      <h1>Hello, {name}!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Suspendisse tristique sapien vitae arcu dapibus, ut tempus nibh vestibulum. 
        In vitae ligula turpis. Nam purus tortor, lacinia quis nulla 
        vitae, sagittis lobortis neque. Donec posuere volutpat ex, 
        condimentum convallis magna rutrum elementum. Vivamus feugiat, 
        libero sed euismod sollicitudin, ipsum orci posuere sapien, at cursus 
        libero tortor vel turpis. Suspendisse potenti. 
        Maecenas blandit risus quis euismod rhoncus. 
        Morbi ac consequat nisi, eu vehicula dui. Quisque tincidunt
        bibendum auctor. Etiam a auctor lectus.
      </p>
      <Button bsStyle="primary" className= "logout-btn" onClick={logout}>Logout</Button>
    </Jumbotron>
  );
}

GreetingPage.propTypes = {
  name: PropTypes.string,
  nauserIdme: PropTypes.string,
  logout: PropTypes.func,
  fetchUser: PropTypes.func
};

export const mapSTP = (state) => ({
  name: state.get("user").get("name"),
  userId: state.get("authenticationInfo").get("id")
});

export default connect(mapSTP, {
  logout,
  fetchUser
})(GreetingPage);