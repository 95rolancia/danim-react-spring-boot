import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const StartLoading = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <img
        className={classes.background}
        width="100%"
        height="100%"
        src="images/main-background.gif"
        alt=""
      />
      <Typography className={classes.title} variant="button">
        여행과 추억속으로 ,
      </Typography>
      <Typography className={classes.title} variant="h2" component="h2">
        DANIM
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
  },
  title: {
    color: 'whitesmoke',
    // fontWeight: 'bold',
    fontFamily: 'MingukBold',
    // [theme.breakpoints.up('md')]: {
    //   fontSize: '4rem',
    // },
  },
  background: {
    position: 'absolute',
    top: '0',
    opacity: '0.8',
    zIndex: '-1',
  },
}));

export default StartLoading;
