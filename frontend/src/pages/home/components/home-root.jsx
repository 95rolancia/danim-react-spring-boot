import React from 'react';
import Slider from '../../../components/slider/slider';
import { Typography, makeStyles } from '@material-ui/core';
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
    color: '#36434C',
  },
}));
const HomeRoot = ({ popularContents, contents }) => {
  const classes = useStyles();

  return (
    <>
      {contents.map((content) => (
        <div key={content.area}>
          <Typography
            variant="h5"
            component="span"
            color="primary"
            className={classes.interest}
          >
            {content.area}
          </Typography>
          <Typography
            variant="h5"
            component="span"
            className={classes.interestSub}
          >
            인기 Story
          </Typography>
          <div className={classes.marginBottom}></div>
          <Slider className={classes.marginBottom} datas={content.stories} />
          <div className={classes.marginBottom}></div>
        </div>
      ))}

      <div className={classes.marginBottom}>
        <Typography variant="h5" component="span" className={classes.title}>
          다님 인기 여행 Story
        </Typography>
      </div>
      <Slider datas={popularContents} />
      <div className={classes.marginBottom}></div>
    </>
  );
};

export default HomeRoot;
