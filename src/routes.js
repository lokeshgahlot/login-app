import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "./components/App";
import LoginPage from "./components/pages/Login";
import RegistrationPage from "./components/pages/Registration";
import GreetingPage from "./components/pages/Greeting";
import WithAlert from "./components/WithAlert";
import PrivateRoute from "./components/PrivateRoute";


export default _ => {
  return (
    <Router>
      <App>
        <WithAlert>
          <Route path="/" exact render = {_ => <Redirect to="/login"/>} />
          <Route path="/login" component={LoginPage} />
          <Route path="/sign-up" component={RegistrationPage} />
          {/* Restricted route*/}
          <PrivateRoute path="/greeting" component = {GreetingPage}/> 
        </WithAlert>
      </App>
    </Router>
  );
};