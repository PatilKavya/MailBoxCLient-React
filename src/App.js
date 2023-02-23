import React from "react";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
    <Switch>
      <Route path="/signIn">
        <SignUp />
      </Route>
      <Route path="/logIn">
        <Login />
      </Route>
      <Route path='/password'>
          <ForgotPassword />
        </Route>
        </Switch>
    </>
  );
}

export default App;
