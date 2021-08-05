import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    height: '30vw',
    width: '30vw',
    paddingBottom: '2vh',
    objectFit: 'cover',
  },
}));

const Img = ({ img, onClick }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick(img);
  };

  return (
    <img
      src={img.imgPreviewURL}
      alt={img.imgFile.name}
      className={classes.thumbnail}
      onClick={handleClick}
    />
  );
};

export default Img;
