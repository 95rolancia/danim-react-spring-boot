import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { PlanItem } from '..';
import useUser from '../../../../hooks/useUser';
import { List } from '@material-ui/core';

const PlanList = observer(() => {
  const user = useUser();
  return (
    <List>
      {user.user.plans &&
        toJS(user.user.plans).map((plan) => (
          <PlanItem plan={plan} key={plan.id} />
        ))}
    </List>
  );
});

export default PlanList;
