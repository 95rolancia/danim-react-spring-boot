import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  planDayContainer: {
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    borderBottom: '0.5px solid darkgrey',
  },
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 2),
    borderRadius: '1.2em',
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
}));

const PlanDay = ({ date }) => {
  const classes = useStyles();
  const history = useHistory();

  // 나중에 기존의 계획을 읽었을 때 상태 반영 해야됌

  const gotoPlanSearch = () => {
    history.push({ pathname: '/plan/search', state: { date: date } });
  };

  return (
    <section className={classes.planDayContainer}>
      <h1>day {date}</h1>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={gotoPlanSearch}
        >
          장소 추가
        </Button>
      </div>
    </section>
  );
};

export default PlanDay;
