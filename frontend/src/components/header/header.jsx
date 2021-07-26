import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({}));
const Header = (props) => {
  // const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="button">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            DANIM
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
