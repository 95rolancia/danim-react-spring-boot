import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Slider from '../../../components/slider/slider';

const HomeRoot = ({ datas }) => {
  return (
    <>
      <Slider datas={datas} />
      <Box component="span" m={1}></Box>
      <div>
        <Typography variant="h5" component="span">
          다님 인기 여행 Story
        </Typography>
      </div>
      <Box component="span" m={1}></Box>
      <Slider datas={datas} />
    </>
  );
};

export default HomeRoot;
