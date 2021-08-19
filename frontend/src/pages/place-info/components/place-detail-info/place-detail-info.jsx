import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useSearch from '../../../../hooks/useSearch';
import usePlan from '../../../../hooks/usePlan';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  placeDetailInfo: {
    marginTop: theme.spacing(6),
    textAlign: 'center',
  },
  placeName: {
    fontFamily: 'MingukBold',
    color: '#36434C',
    marginBottom: theme.spacing(2),
  },
  placeType: {
    marginBottom: theme.spacing(2),
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
    search.resetSearchPlace();
    history.push('/main/plan/area');
  };

  return (
    <section className={classes.placeDetailInfo}>
      <Typography className={classes.placeName} variant="h5">
        {toJS(search.placeDetailInfo.name)}
      </Typography>
      <Typography className={classes.placeType} variant="h6">
        {toJS(search.placeDetailInfo.type)}
      </Typography>
      <Typography variant="body1">
        {toJS(search.placeDetailInfo.address)}
      </Typography>
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
