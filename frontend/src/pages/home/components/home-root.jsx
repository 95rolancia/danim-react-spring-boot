import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import Slider from '../../../components/slider/slider';
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'MingukBold',
    marginLeft: theme.spacing(2),
    color: '#36434C',
  },
}));
const HomeRoot = ({ datas }) => {
  const classes = useStyles();
  return (
    <>
      <Slider datas={datas} />
      <Box component="span" m={1}></Box>
      <div>
        <Typography variant="h5" component="span" className={classes.title}>
          다님 인기 여행 Story
        </Typography>
      </div>
      <Box component="span" m={1}></Box>
      <Slider datas={datas} />
    </>
  );
};

export default HomeRoot;
