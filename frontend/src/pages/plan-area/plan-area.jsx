import React from 'react';
import { HeaderGoBack } from '../../components';
import { PlanMap, PlanDayList } from './components';
import { getPlanDate, getFullPlanDate } from '../../util/data-transform';
import { Button, makeStyles } from '@material-ui/core';
import usePlan from '../../hooks/usePlan';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  planAreaContainer: {
    backgroundColor: '#fafafa',
    height: '100vh',
  },
  buttonContainer: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: '5em',
  },
  button: {
    marginTop: theme.spacing(2),
    borderRadius: '30px',
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
}));

const PlanArea = observer(() => {
  const classes = useStyles();
  const plan = usePlan();
  const history = useHistory();

  const submitPlan = async () => {
    const newPlan = {
      startDate: plan.startDate
        .toJSON()
        .substring(0, plan.startDate.toJSON().length - 1),
      endDate: plan.endDate
        .toJSON()
        .substring(0, plan.endDate.toJSON().length - 1),
      places: toJS(plan.subPlans),
      title: '1',
    };
    if (await plan.createPlan(newPlan)) {
      alert('계획 만들기 성공!');
      history.push('/main/plan');
    } else {
      alert('계획 만들기에 오류가 생겼습니다. 잠시 후에 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  });

  return (
    <section className={classes.planAreaContainer}>
      <HeaderGoBack
        title={getPlanDate(toJS(plan.startDate), toJS(plan.endDate))}
      />
      <PlanMap />
      <PlanDayList
        getFullPlanDate={getFullPlanDate(
          toJS(plan.startDate),
          toJS(plan.endDate),
        )}
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={submitPlan}
        >
          완료
        </Button>
      </div>
    </section>
  );
});

export default PlanArea;
