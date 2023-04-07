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
import { useSelector } from "react-redux";

function App() {

  let auth=useSelector(state=>state.auth.isLogin);
  console.log(auth)

  return (
    <>
      <Switch>
       { auth && <Route path="/" exact>
          <Header/>
        </Route>}
       {  auth &&<Route path='/compose'>
          <ComposeMail/>
        </Route>}
      {   auth &&<Route path='/inbox'>
          <Inbox/>
        </Route>}
       { auth && <Route path='/sent'>
          <Sent/>
        </Route>}
      {  auth && <Route path='/home'>
          <Home/>
        </Route>}
      { !auth && <Route path="/signIn">
          <SignUp />
        </Route>}
       <Route path="/logIn">
          <Login />
        </Route>
       {  auth &&<Route path="/password">
          <ForgotPassword />
        </Route>}
      </Switch>
    </>
  );
}

export default App;
