import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useSearch from '../../../../hooks/useSearch';
import usePlan from '../../../../hooks/usePlan';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  placeDetailInfo: {
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
    borderRadius: '30px',
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
}));

const PlaceDetailInfo = observer(() => {
  const classes = useStyles();
  const search = useSearch();
  const history = useHistory();
  const plan = usePlan();

  const addPlaceToPlan = () => {
    plan.addPlaceToPlan(toJS(search.placeDetailInfo));
    history.push('/main/plan/area');
  };

  return (
    <section className={classes.placeDetailInfo}>
      <h1>{toJS(search.placeDetailInfo.name)}</h1>
      <h1>{toJS(search.placeDetailInfo.address)}</h1>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={addPlaceToPlan}
      >
        일정에 추가
      </Button>
    </section>
  );
});

export default PlaceDetailInfo;
