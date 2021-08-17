import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { HeaderGoBack } from '../../components';
import { DateRange } from 'react-date-range';
import * as rdrLocales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import usePlan from '../../hooks/usePlan';
import { getFullPlanDate } from '../../util/data-transform';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  planDate: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    borderRadius: '30px',
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
}));

const PlanDate = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const plan = usePlan();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const choiceDate = () => {
    history.push({ pathname: '/main/plan/area' });
    plan.setDate(date[0].startDate, date[0].endDate);
    plan.initSubPlans(getFullPlanDate(date[0].startDate, date[0].endDate));
    localStorage.setItem('startDate', JSON.stringify(date[0].startDate));
    localStorage.setItem('endDate', JSON.stringify(date[0].endDate));
    localStorage.setItem(
      'subPlans',
      getFullPlanDate(date[0].startDate, date[0].endDate),
    );
  };

  return (
    <>
      <HeaderGoBack title={'여행 날짜 정하기'} />
      <section className={classes.planDate}>
        <DateRange
          editableDateInputs={true}
          onChange={(date) => setDate([date.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          locale={rdrLocales.ko}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={choiceDate}
        >
          등록
        </Button>
      </section>
    </>
  );
});

export default PlanDate;
