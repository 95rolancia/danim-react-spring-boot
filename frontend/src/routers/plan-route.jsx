import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { PlanDate, PlanArea, NotFound, PlanSearch, Plan } from '../pages';

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
      <Route {...rest} exact path={`${path}/search`}>
        <PlanSearch />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default PlanRoute;
