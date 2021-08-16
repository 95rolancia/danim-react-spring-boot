import React from 'react';
import { PlanDayItem } from '..';
import { List, makeStyles } from '@material-ui/core';

const generate = (element, length) => {
  return Array.from({ length: length }, (_, i) => i + 1).map((date) =>
    React.cloneElement(element, {
      key: date,
      date: date,
    }),
  );
};

const useStyles = makeStyles((theme) => ({
  planListContainer: {
    padding: theme.spacing(2),
  },
}));

const PlanDayList = ({ getFullPlanDate }) => {
  const classes = useStyles();
  return (
    <List className={classes.planListContainer}>
      {generate(<PlanDayItem />, getFullPlanDate)}
    </List>
  );
};

export default PlanDayList;
