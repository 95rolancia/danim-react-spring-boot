import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderGoBack } from '../../components';
import { PlanMap, PlanDayList } from './components';
import { getPlanDate, getFullPlanDate } from '../../util/data-transform';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  planAreaContainer: {
    backgroundColor: '#fafafa',
    height: '100vh',
  },
}));

const PlanArea = () => {
  const location = useLocation();
  const classes = useStyles();
  const [date, setDate] = useState(location.state.date);

  return (
    <section className={classes.planAreaContainer}>
      <HeaderGoBack title={date && getPlanDate(date)} />
      <PlanMap />
      <PlanDayList getFullPlanDate={getFullPlanDate(date)} />
    </section>
  );
};

export default PlanArea;
