import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Search, Trip, Bookmark } from '../';
import { Navbar } from '../../components';
import AccountRoute from '../../routers/account-route';
import MyPageRoute from '../../routers/my-page-route';

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
        <Route path="/main/trip" exact>
          <Trip />
        </Route>
        <Route path="/main/bookmark" exact>
          <Bookmark />
        </Route>
        <Route path="/main/account">
          <AccountRoute />
        </Route>
        <MyPageRoute path="/main/:nickname" />
      </Switch>
      <Navbar />
    </>
  );
};

export default Main;
