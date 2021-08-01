import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Search, Trip, Bookmark, Profile } from '../';
import { Navbar, Header } from '../../components';

const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/main" exact component={Home} />
        <Route path="/main/search" exact>
          <Search />
        </Route>
        <Route path="/main/trip" exact>
          <Trip />
        </Route>
        <Route path="/main/bookmark" exact>
          <Bookmark />
        </Route>
        <Route path="/main/profile" exact>
          <Profile />
        </Route>
      </Switch>
      <Navbar />
    </>
  );
};

export default Main;
