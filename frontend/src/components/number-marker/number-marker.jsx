import { makeStyles } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  number: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1.5em',
    height: '1.5em',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    border: '1px solid black',
    backgroundColor: 'skyblue',
    color: 'whitesmoke',
  },
}));

const NumberMarker = ({ number, color }) => {
  const classes = useStyles();
  return (
    <span className={classes.number} style={{ backgroundColor: color }}>
      {number}
    </span>
  );
};

export default NumberMarker;
