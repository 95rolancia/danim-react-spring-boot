import React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ children, authStore, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return authStore.isLoggedIn ? children : <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
