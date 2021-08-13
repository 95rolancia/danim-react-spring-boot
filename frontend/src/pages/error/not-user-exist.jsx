import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  notFoundImg: {
    width: '8em',
    marginBottom: '2em',
  },
  title: {
    fontFamily: 'MingukBold',
  },
}));

const NotUserExist = () => {
  const classes = useStyles();
  return (
    <section className={classes.paper}>
      <img
        className={classes.notFoundImg}
        src="/images/danierror.png"
        alt="page not found img"
      />
      <Typography color="primary" variant="h5" className={classes.title}>
        이런! 존재하지 않는 사용자입니다.
      </Typography>
    </section>
  );
};

export default NotUserExist;
