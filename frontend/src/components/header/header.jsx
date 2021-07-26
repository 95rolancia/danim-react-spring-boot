import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => {});
const Header = (props) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.header}>
      <Toolbar>
        {/* 나중에 link? */}
        <Typography variant="button">DANIM</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
