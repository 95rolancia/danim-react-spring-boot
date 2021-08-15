import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import Slider from '../../../components/slider/slider';
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'MingukBold',
    marginLeft: theme.spacing(2),
    color: '#36434C',
  },
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
  interest: {
    marginLeft: theme.spacing(2),
    fontFamily: 'MingukBold',
  },
  interestSub: {
    marginLeft: theme.spacing(1),
    fontFamily: 'MingukBold',
  },
}));
const HomeRoot = ({ datas, interests }) => {
  const classes = useStyles();
  return (
    <>
      {interests.map((interest) => (
        <div key={interest}>
          <Typography
            variant="h5"
            component="span"
            color="primary"
            className={classes.interest}
          >
            {interest}
          </Typography>
          <Typography
            variant="h5"
            component="span"
            className={classes.interestSub}
          >
            추천 Story
          </Typography>
          <div className={classes.marginBottom}></div>
          <Slider className={classes.marginBottom} datas={datas} />
        </div>
      ))}
      <div className={classes.marginBottom}>
        <Typography variant="h5" component="span" className={classes.title}>
          다님 인기 여행 Story
        </Typography>
      </div>
      <Slider datas={datas} />
    </>
  );
};

export default HomeRoot;
