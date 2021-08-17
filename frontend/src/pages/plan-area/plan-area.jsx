import React from 'react';
import { HeaderGoBack } from '../../components';
import { PlanMap, PlanDayList } from './components';
import { getPlanDate, getFullPlanDate } from '../../util/data-transform';
import { Button, makeStyles } from '@material-ui/core';
import usePlan from '../../hooks/usePlan';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRef } from 'react';

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
  dialogButtonGroup: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const PlanArea = observer(() => {
  const classes = useStyles();
  const plan = usePlan();
  const history = useHistory();
  const location = useLocation();

  const submitPlan = async () => {
    const newPlan = {
      startDate: plan.startDate
        .toJSON()
        .substring(0, plan.startDate.toJSON().length - 1),
      endDate: plan.endDate
        .toJSON()
        .substring(0, plan.endDate.toJSON().length - 1),
      places: toJS(plan.subPlans),
      title: inputTitleRef.current.value,
    };

    switch (plan.currentPlanType) {
      case 'write':
        if (await plan.createPlan(newPlan)) {
          alert('계획 만들기 성공!');
          history.push('/main/plan');
        } else {
          alert(
            '계획 만들기에 오류가 생겼습니다. 잠시 후에 다시 시도해주세요.',
          );
        }
        break;
      case 'edit':
        if (await plan.updatePlan(newPlan, plan.currentReadingPlanNo)) {
          alert('계획 만들기 성공!');
          history.push('/main/plan');
        } else {
          alert(
            '계획 만들기에 오류가 생겼습니다. 잠시 후에 다시 시도해주세요.',
          );
        }
        break;
      default:
        throw new Error('unknown submit type');
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
  });

  useEffect(() => {
    if (location.state !== undefined) {
      plan.getDetailPlan(location.state.planId);
      plan.type = 'edit';
    }
  }, [plan, location.state]);

  const [open, setOpen] = React.useState(false);
  const inputTitleRef = useRef();

  const handleClickOpen = () => {
    let canISubmit = true;
    let plans = toJS(plan.subPlans);

    for (let i = 0; i < plans.length; i++) {
      if (plans[i].length === 0) {
        canISubmit = false;
        break;
      }
    }

    if (!canISubmit) {
      alert('일차 별로 적어도 하나씩 장소를 추가하셔야해요!');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className={classes.planAreaContainer}>
      <HeaderGoBack
        title={getPlanDate(toJS(plan.startDate), toJS(plan.endDate))}
      />
      {plan.loadingDetailPlan === 'pending' ? (
        <h1>로딩중</h1>
      ) : (
        <>
          <PlanMap />
          <PlanDayList
            getFullPlanDate={getFullPlanDate(
              toJS(plan.startDate),
              toJS(plan.endDate),
            )}
          />
        </>
      )}

      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClickOpen}
        >
          {plan.currentPlanType === 'write' ? '완료' : '수정'}
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          여행의 제목을 지어주세요
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="여행의 제목"
            type="text"
            fullWidth
            inputRef={inputTitleRef}
          />
        </DialogContent>
        <DialogActions className={classes.dialogButtonGroup}>
          <Button onClick={handleClose} color="red">
            취소
          </Button>
          <Button onClick={submitPlan} color="primary">
            완료
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
});

export default PlanArea;
