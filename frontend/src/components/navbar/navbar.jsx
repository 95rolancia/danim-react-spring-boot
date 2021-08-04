import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import {
  Home,
  Search,
  BookmarkBorder,
  PersonOutlineOutlined,
  Create,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import useUser from '../../hooks/useUser';

const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom: 0,
    position: 'fixed',
  },
});

const Navbar = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const user = useUser();

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
          icon={<BookmarkBorder />}
          onClick={() => {
            history.push('/main/bookmark');
          }}
        />
        <BottomNavigationAction
          icon={<PersonOutlineOutlined />}
          onClick={() => {
            history.push(`/main/${toJS(user.user).nickname}`);
          }}
        />
      </BottomNavigation>
    </AppBar>
  );
});

export default Navbar;
