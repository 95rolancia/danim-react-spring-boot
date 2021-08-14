import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PlanDate, NotFound } from '../pages';

const PlanRoute = ({ children, ...rest }) => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route {...rest} exact path={`${path}/date`}>
        <PlanDate />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default PlanRoute;
