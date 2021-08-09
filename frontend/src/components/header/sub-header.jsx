import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { observer } from 'mobx-react-lite';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'MingukBold',
    color: '#36434C',
  },
}));

const SubHeader = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const goToMain = () => {
    history.push('/main');
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <IconButton color="primary" component="span">
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SubHeader;
