import React from 'react';
import { makeStyles, Container, Button } from '@material-ui/core';
import { StoryCover, StoryDay } from './index';
import { PhotoSizeSelectLargeOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {});

const MemoWrite = ({
  title,
  photos,
  imgErrSuccess,
  tripDate,
  whereWhen,
  nickname,
}) => {
  const classes = useStyles();
  const imgBaseURL = process.env.REACT_APP_IMAGE_BASE_URL;

  const watchPhoto = () => {
    console.log(photos);
    console.log(imgErrSuccess);
    console.log(tripDate);
    console.log(whereWhen);
  };

  return (
    <>
      <StoryCover title={title} />
      <StoryDay imgBaseURL={imgBaseURL} photos={photos} nickname={nickname} />
      <Button onClick={watchPhoto}>포토보자</Button>
    </>
  );
};

export default MemoWrite;
