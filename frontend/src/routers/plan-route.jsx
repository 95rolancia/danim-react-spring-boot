import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Plan, PlanDate, PlanArea, NotFound } from '../pages';

const PlanRoute = ({ children, ...rest }) => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route {...rest} exact path={`${path}`}>
        <Plan />
      </Route>
      <Route {...rest} exact path={`${path}/date`}>
        <PlanDate />
      </Route>
      <Route {...rest} exact path={`${path}/area`}>
        <PlanArea />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default PlanRoute;
