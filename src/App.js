import React from "react";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/LayOut/Header";
import Home from "./components/LayOut/Home";
import ComposeMail from "./components/Mail/ComposeMail";
import Inbox from "./components/Mail/Inbox";
import Sent from "./components/Mail/Sent";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Header />
        </Route>
        <Route path='/compose'>
          <ComposeMail/>
        </Route>
        <Route path='/inbox'>
          <Inbox/>
        </Route>
        <Route path='/sent'>
          <Sent/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path="/signIn">
          <SignUp />
        </Route>
        <Route path="/logIn">
          <Login />
        </Route>
        <Route path="/password">
          <ForgotPassword />
        </Route>
      </Switch>
    </>
  );
}

export default App;
