import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { HeaderMain } from '../../components';
import { PlanList } from './components';
import { makeStyles, Button } from '@material-ui/core';
import usePlan from '../../hooks/usePlan';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
    borderRadius: '1em',
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
}));

const Plan = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const plan = usePlan();

  const goToPlanMaker = () => {
    plan.currentPlanType = 'write';
    history.push('/main/plan/date');
  };

  return (
    <>
      <HeaderMain />
      <section className={classes.container}>
        <PlanList />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={goToPlanMaker}
        >
          계획 만들기
        </Button>
      </section>
    </>
  );
});

export default Plan;
