import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderGoBack } from '../../components';
import { DateRange } from 'react-date-range';
import * as rdrLocales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  planDate: {
    height: '100vh',
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

const PlanMaker = () => {
  const classes = useStyles();
  const history = useHistory();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const choiceDate = () => {
    history.push({ pathname: '/plan/area', state: { date: date[0] } });
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
};

export default PlanMaker;
