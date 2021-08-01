import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  Home,
  Search,
  CardTravel,
  BookmarkBorder,
  PersonOutlineOutlined,
  Create,
} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom: 0,
    position: 'fixed',
  },
});
const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  return (
    <AppBar>
      <BottomNavigation
        className={classes.root}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={<Home />}
          onClick={() => {
            history.push('/main');
          }}
        />
        <BottomNavigationAction
          icon={<Search />}
          onClick={() => {
            history.push('/main/search');
          }}
        />
        <BottomNavigationAction
          icon={<Create />}
          onClick={() => {
            history.push('/create');
          }}
        />
        <BottomNavigationAction
          icon={<CardTravel />}
          onClick={() => {
            history.push('/main/trip');
          }}
        />
        <BottomNavigationAction
          icon={<BookmarkBorder />}
          onClick={() => {
            history.push('/main/bookmark');
          }}
        />
        <BottomNavigationAction
          icon={<PersonOutlineOutlined />}
          onClick={() => {
            history.push('/main/profile');
          }}
        />
      </BottomNavigation>
    </AppBar>
  );
};

export default Navbar;
