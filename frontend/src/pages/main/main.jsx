import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Search, Trip, Bookmark, MyPage } from '../';
import { Navbar, Header } from '../../components';

const Main = () => {
  return (
    <>
      <Header />
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
        <Route path="/main/my-page" exact>
          <MyPage />
        </Route>
      </Switch>
      <Navbar />
    </>
  );
};

export default Main;
