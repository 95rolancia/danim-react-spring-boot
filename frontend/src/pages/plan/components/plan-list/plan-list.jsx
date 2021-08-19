import React, { useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { PlanItem } from '..';
import useUser from '../../../../hooks/useUser';
import { List } from '@material-ui/core';

const PlanList = observer(() => {
  const user = useUser();

  useEffect(() => {
    user.getPlan();
  }, [user]);

  return (
    <List>
      {toJS(user.plans) ? (
        toJS(user.plans).map((plan) => (
          <PlanItem plan={plan} key={plan.planNo} />
        ))
      ) : (
        <h1>작성된 계획이 없습니다!</h1>
      )}
    </List>
  );
});

export default PlanList;
