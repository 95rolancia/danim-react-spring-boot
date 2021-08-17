import React, { useEffect } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import Slider from '../../../components/slider/slider';
import { useState } from 'react';
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
const HomeRoot = ({ popularContents, contents }) => {
  const classes = useStyles();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    let datas = [];
    Object.keys(contents).forEach((key) => {
      datas.push(key);
    });
    setKeys(datas);
  }, [contents, popularContents]);

  return (
    <>
      {keys.map((key) => (
        <div key={key}>
          <Typography
            variant="h5"
            component="span"
            color="primary"
            className={classes.interest}
          >
            {key}
          </Typography>
          <Typography
            variant="h5"
            component="span"
            className={classes.interestSub}
          >
            인기 Story
          </Typography>
          <div className={classes.marginBottom}></div>
          <Slider className={classes.marginBottom} datas={contents[key]} />
        </div>
      ))}

      <div className={classes.marginBottom}>
        <Typography variant="h5" component="span" className={classes.title}>
          다님 인기 여행 Story
        </Typography>
      </div>
      <Slider datas={popularContents} />
    </>
  );
};

export default HomeRoot;
