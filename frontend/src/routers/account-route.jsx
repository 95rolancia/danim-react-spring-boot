import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AccountEdit from '../components/account-edit/account-edit';

const AccountRoute = ({ children, ...rest }) => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route {...rest} exact path={`${path}/edit`}>
        <AccountEdit />
      </Route>
    </Switch>
  );
};

export default AccountRoute;
