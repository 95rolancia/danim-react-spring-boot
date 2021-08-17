import React from 'react';
import { observer } from 'mobx-react-lite';
import usePlan from '../../../../hooks/usePlan';
import { makeStyles, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  user: {
    cursor: 'pointer',
  },
}));

const PlanDayPlaceItem = observer(({ place, order, day }) => {
  const plan = usePlan();
  const classes = useStyles();

  const removePlaceItem = () => {
    plan.deletePlaceFromPlan(place.name, day);
  };

  return (
    <>
      <ListItem className={classes.user}>
        <ListItemText primary={order + 1} />
        <ListItemText primary={place.name} />
        <Delete color="primary" onClick={removePlaceItem} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
});

export default PlanDayPlaceItem;
