import React from 'react';
import { observer } from 'mobx-react-lite';
import useStory from '../../../hooks/useStory';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';

const LoveList = observer(({ love, loveCnt, no, handleLike }) => {
  const story = useStory();

  const like = (e) => {
    e.preventDefault();
    story.like({ storyNo: no }).then((res) => {
      if (res === 'exist') alert('이미 좋아요를 눌렀습니다.');
      handleLike();
    });
  };
  const unlike = (e) => {
    e.preventDefault();
    story.unlike({ storyNo: no }).then((res) => {
      handleLike();
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
    </AppBar>
  );
});

export default LoveList;
