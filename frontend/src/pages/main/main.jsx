import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from '../search/search';
import Trip from '../trip/trip';
import Bookmark from '../bookmark/bookmark';
import Profile from '../profile/profile';
import Navbar from '../../components/navbar/navbar';

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact></Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/trip" exact>
          <Trip />
        </Route>
        <Route path="/bookmark" exact>
          <Bookmark />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
      </Switch>
      <Navbar />
    </BrowserRouter>
  );
};

export default Main;
