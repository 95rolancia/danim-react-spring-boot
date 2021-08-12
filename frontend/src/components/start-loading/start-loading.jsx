import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  background: {
    position: 'absolute',
    top: '0',
    opacity: '0.8',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    textAlign: 'center',
    paddingBottom: '5em',
    zIndex: '3',
  },
  title: {
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
}));

const StartLoading = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <img
        className={classes.background}
        src="images/main-background.gif"
        alt="landing-page-background-img"
      />
      <section className={classes.titleContainer}>
        <Typography className={classes.title}>여행과 추억속으로 ,</Typography>
        <Typography className={classes.title} variant="h2" component="h2">
          DANIM
        </Typography>
      </section>
    </div>
  );
};

export default StartLoading;
