import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AccountEdit, AccountChangePwd } from '../components';

const AccountRoute = ({ children, ...rest }) => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route {...rest} exact path={`${path}/edit`}>
        <AccountEdit />
      </Route>
      <Route {...rest} exact path={`${path}/change-password`}>
        <AccountChangePwd />
      </Route>
    </Switch>
  );
};

export default AccountRoute;
