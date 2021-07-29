import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExploreIcon from '@material-ui/icons/Explore';
import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const moveHome = () => {
    history.push('/');
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <ExploreIcon onClick={moveHome} />
          </IconButton>
          <Typography variant="button" className={classes.title}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              DANIM
            </Link>
          </Typography>
          <Button color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
