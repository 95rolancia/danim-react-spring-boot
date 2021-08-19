import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  introduce: {
    textAlign: 'start',
    padding: theme.spacing(1.5),
  },
  introduceTitle: {
    paddingBottom: theme.spacing(1),
    color: '#606060',
  },
}));

const Introduce = ({ introduce }) => {
  const classes = useStyles();
  return (
    <section className={classes.introduce}>
      <Typography variant="body1" className={classes.introduceTitle}>
        소개
      </Typography>
      <Typography variant="body2">{introduce}</Typography>
    </section>
  );
};

export default Introduce;
