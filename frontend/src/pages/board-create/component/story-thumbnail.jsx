import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    height: '30vw',
    width: '30vw',
    paddingBottom: '2vh',
    objectFit: 'cover',
  },
}));

const StoryThumbnail = ({ photo, boardCreate }) => {
  const classes = useStyles();
  const photoURL =
    boardCreate.imgBaseURL + boardCreate.nickname + '/' + photo.filename;

  return (
    <>
      <img src={photoURL} alt={photo.adress} className={classes.thumbnail} />
    </>
  );
};

export default StoryThumbnail;
