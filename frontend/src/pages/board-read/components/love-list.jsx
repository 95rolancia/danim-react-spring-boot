import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import useStory from '../../../hooks/useStory';
import {
  AppBar,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const LoveList = observer(({ love, loveCnt, no, handleLike }) => {
  const story = useStory();
  const [snackbarInfo, setSnackbarInfo] = useState({
    isShow: false,
    msg: '',
    state: '',
  });

  const like = (e) => {
    e.preventDefault();
    story.like({ storyNo: no }).then((res) => {
      if (res === 'exist') {
        setSnackbarInfo({
          isShow: true,
          msg: '자신의 글에는 좋아요를 누를 수 없어요.',
          state: 'error',
        });
        return;
      }
      handleLike();
    });
  };
  const unlike = (e) => {
    e.preventDefault();
    story.unlike({ storyNo: no }).then((res) => {
      handleLike();
    });
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarInfo({
      ...snackbarInfo,
      isShow: false,
    });
  };
  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar variant="dense">
        {love ? (
          <IconButton edge="start" color="secondary" onClick={unlike}>
            <Favorite />
          </IconButton>
        ) : (
          <IconButton edge="start" color="secondary" onClick={like}>
            <FavoriteBorder />
          </IconButton>
        )}
        <Typography variant="button">
          이 스토리를 {loveCnt}명이 좋아합니다.
        </Typography>
      </Toolbar>
      <Snackbar
        open={snackbarInfo.isShow}
        autoHideDuration={700}
        onClose={handleClose}
      >
        <Alert severity={snackbarInfo.state} onClose={handleClose}>
          {snackbarInfo.msg}
        </Alert>
      </Snackbar>
    </AppBar>
  );
});

export default LoveList;
