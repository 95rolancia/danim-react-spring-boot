import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
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
          icon={<HomeIcon />}
          onClick={() => {
            history.push('/');
          }}
        />
        <BottomNavigationAction
          icon={<SearchIcon />}
          onClick={() => {
            history.push('/search');
          }}
        />
        <BottomNavigationAction
          icon={<CardTravelIcon />}
          onClick={() => {
            history.push('/trip');
          }}
        />
        <BottomNavigationAction
          icon={<BookmarkBorderIcon />}
          onClick={() => {
            history.push('/bookmark');
          }}
        />
        <BottomNavigationAction
          icon={<PersonOutlineOutlinedIcon />}
          onClick={() => {
            history.push('/profile');
          }}
        />
      </BottomNavigation>
    </AppBar>
  );
};

export default Navbar;
