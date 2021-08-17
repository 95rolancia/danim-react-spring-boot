import React from 'react';
import { useHistory } from 'react-router-dom';
import { getPlanDate } from '../../../../util/data-transform';
import { makeStyles, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import useUser from '../../../../hooks/useUser';

const useStyles = makeStyles((theme) => ({
  plan: {
    cursor: 'pointer',
  },
}));

const PlanItem = ({ plan }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();

  const readPlan = () => {
    history.push({
      pathname: '/main/plan/area',
      state: { planId: plan.planNo },
    });
  };

  const deletePlan = async (e) => {
    e.preventDefault();
    const res = await user.deletePlan(plan.planNo);
    if (res) {
      alert('계획 삭제가 완료되었습니다.');
    } else {
      alert('서버에 문제가 발생했습니다. 다시 시도해주세요');
    }
  };

  return (
    <>
      <ListItem className={classes.plan}>
        <ListItemText
          primary={plan.title}
          secondary={getPlanDate(
            new Date(plan.startDate),
            new Date(plan.endDate),
          )}
          onClick={readPlan}
        />
        <Delete color="error" onClick={deletePlan} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};
export default PlanItem;
