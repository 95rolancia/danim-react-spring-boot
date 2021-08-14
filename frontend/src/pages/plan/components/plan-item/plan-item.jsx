import React from 'react';
import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  plan: {
    cursor: 'pointer',
  },
}));

const PlanItem = ({ plan }) => {
  const classes = useStyles();
  const history = useHistory();
  const readPlan = () => {
    history.push({ pathname: '/plan/area', state: { planId: plan.id } });
  };

  return (
    <>
      <ListItem className={classes.plan} onClick={readPlan}>
        <ListItemAvatar>
          <Avatar src={plan.img} />
        </ListItemAvatar>
        <ListItemText primary={plan.name} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};
export default PlanItem;
