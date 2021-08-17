import React from 'react';
import { List } from '@material-ui/core';
import PlanDayPlaceItem from '../plan-day-place-item/plan-day-place-item';

const PlanDayPlaceList = ({ places, day }) => {
  return (
    <List>
      {places.map((place, idx) => (
        <PlanDayPlaceItem place={place} order={idx} key={idx} day={day} />
      ))}
    </List>
  );
};

export default PlanDayPlaceList;
