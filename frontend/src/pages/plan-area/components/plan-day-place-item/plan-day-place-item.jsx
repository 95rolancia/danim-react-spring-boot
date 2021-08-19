import React from 'react';
import { observer } from 'mobx-react-lite';
import usePlan from '../../../../hooks/usePlan';
import {
  makeStyles,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  user: {
    cursor: 'pointer',
  },
  placeCnt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0.2),
    width: '1em',
    height: '1em',
    borderRadius: '50%',
    color: 'white',
    backgroundColor: 'darkgrey',
  },
}));

const PlanDayPlaceItem = observer(({ place, order, day }) => {
  const plan = usePlan();
  const classes = useStyles();

  const removePlaceItem = () => {
    plan.deletePlaceFromPlan(place.key, day);
  };

  return (
    <>
      <ListItem className={classes.user}>
        <ListItemText
          primary={
            <Typography className={classes.placeCnt}>{order + 1}</Typography>
          }
        />
        <ListItemText primary={place.name} />
        <Delete color="primary" onClick={removePlaceItem} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
});

export default PlanDayPlaceItem;
