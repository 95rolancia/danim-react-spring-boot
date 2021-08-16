import { Typography } from '@material-ui/core';
import React from 'react';

const CardSlide = ({ data }) => {
  return (
    <div>
      <Typography variant="h5">{data.title}</Typography>
      <Typography variant="body2">
        {data.location}, 총 {data.duration}일 여행
      </Typography>
    </div>
  );
};

export default CardSlide;
