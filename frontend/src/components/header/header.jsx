import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExploreIcon from '@material-ui/icons/Explore';
import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const moveHome = () => {
    history.push('/');
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <ExploreIcon />
          </IconButton>
          <Typography variant="button" className={classes.title}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              DANIM
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Header;
