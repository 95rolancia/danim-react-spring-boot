import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { StoryThumbnail } from './index';

const useStyles = makeStyles((theme) => ({
  photoBox: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
}));

const StoryDay = ({ imgBaseURL, photos, nickname, date }) => {
  const classes = useStyles();
  const watchPhoto = () => {
    console.log(photos);
  };

  return (
    <>
      <h1>{date}</h1>
      <button onClick={watchPhoto}>아 포토머임</button>
      <div className={classes.photoBox}>
        {photos.map((photo) => (
          <StoryThumbnail
            key={photo.key}
            photo={photo}
            nickname={nickname}
            imgBaseURL={imgBaseURL}
          />
        ))}
      </div>
    </>
  );
};

export default StoryDay;
