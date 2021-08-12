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

const StoryThumbnail = ({ imgBaseURL, photo, nickname }) => {
  const classes = useStyles();

  const photoURL = imgBaseURL + nickname + '/' + photo.fileName;
  const watchURL = () => {
    console.log('나는 포토유알엘', photoURL);
  };

  return (
    <>
      <img src={photoURL} alt={photo.adress} className={classes.thumbnail} />
      <div>{photo.date}</div>
      <button onClick={watchURL}>유알엘알려줘</button>
    </>
  );
};

export default StoryThumbnail;
