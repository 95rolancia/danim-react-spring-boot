import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Search, Bookmark, BoardCreate, PlaceInfo } from '../';
import { Navbar } from '../../components';
import { AccountRoute, MyPageRoute, PlanRoute } from '../../routers';
import { Box } from '@material-ui/core';

const Main = () => {
  return (
    <>
      <Switch>
        <Route path="/main" exact>
          <Home />
        </Route>
        <Route path="/main/search" exact>
          <Search />
        </Route>
        <Route path="/main/create" exact>
          <BoardCreate />
        </Route>
        <Route path="/main/bookmark" exact>
          <Bookmark />
        </Route>
        <Route path="/main/account">
          <AccountRoute />
        </Route>
        <Route path="/main/plan">
          <PlanRoute />
        </Route>
        <Route path="/main/place/:placeName">
          <PlaceInfo />
        </Route>
        <MyPageRoute path="/main/:nickname" />
      </Switch>
      <Box component="span" m={10} />
      <Navbar />
    </>
  );
};

export default Main;
