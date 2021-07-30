import React from 'react';
import { observer } from 'mobx-react-lite';
import { Redirect, Route } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = observer(({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      isLoggedIn={auth.isLoggedIn}
      render={() => (auth.isLoggedIn ? children : <Redirect to="/signin" />)}
    />
  );
});

export default PrivateRoute;
