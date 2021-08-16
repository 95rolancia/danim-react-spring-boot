import React from 'react';
import { makeStyles } from '@material-ui/styles';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    height: '30vw',
    width: '30vw',
    paddingBottom: '2vh',
    objectFit: 'cover',
  },
}));

const StoryThumbnail = observer(({ photo }) => {
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const photoURL =
    boardCreate.imgBaseURL + boardCreate.nickname + '/' + photo.filename;

  return (
    <>
      <img src={photoURL} alt={photo.adress} className={classes.thumbnail} />
    </>
  );
});

export default StoryThumbnail;
