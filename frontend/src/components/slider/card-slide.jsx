import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'MingukBold',
    color: '#36434C',
  },
}));
const CardSlide = ({ data }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.title} variant="h6">
        {data.title}
      </Typography>
      <Typography variant="body2">
        {`${data.duration - 1}박 ${data.duration}일`}
      </Typography>
      <Typography variant="body2">{data.nickname}</Typography>
    </div>
  );
};

export default CardSlide;
