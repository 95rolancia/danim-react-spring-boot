import { Typography } from '@material-ui/core';
import React from 'react';

const CardSlide = ({ data }) => {
  return (
    <div>
      <Typography variant="h5">{data.title}</Typography>
      <Typography variant="body2">
        총 {data.duration}일, {data.nickname}
      </Typography>
    </div>
  );
};

export default CardSlide;
