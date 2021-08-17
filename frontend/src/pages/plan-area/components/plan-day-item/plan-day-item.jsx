import React from 'react';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import usePlan from '../../../../hooks/usePlan';
import PlanDayPlaceList from '../plan-day-place-list/plan-day-place-list';
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

const PlanDayItem = observer(({ date }) => {
  const classes = useStyles();
  const history = useHistory();
  const plan = usePlan();

  const gotoPlanSearch = () => {
    history.push({ pathname: '/main/plan/search' });
    plan.selectDay(date);
  };

  return (
    <section className={classes.planDayContainer}>
      <h1>day {date}</h1>
      <PlanDayPlaceList places={toJS(plan.subPlans)[date - 1]} day={date - 1} />
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
});

export default PlanDayItem;
