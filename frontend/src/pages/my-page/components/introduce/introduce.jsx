import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  introduce: {
    textAlign: 'start',
    padding: theme.spacing(2),
  },
}));

const Introduce = ({ introduce }) => {
  const classes = useStyles();
  return (
    <section className={classes.introduce}>
      <Typography variant="body2">{introduce}</Typography>
    </section>
  );
};

export default Introduce;
