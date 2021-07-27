import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
const Auth = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Auth;
