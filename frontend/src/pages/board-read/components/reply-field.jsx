import React, { useState } from 'react';
import useStory from '../../../hooks/useStory';
import {
  TextField,
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  whiteText: {
    color: '#F5F5F5',
  },
  marginRight: {
    marginRight: theme.spacing(3),
  },
}));
const ReplyField = ({ no, handleComment }) => {
  const classes = useStyles();
  const story = useStory();
  const [commentContent, setCommentContent] = useState('');
  const [value, setValue] = useState('');

  const checkComment = (e) => {
    const content = e.target.value;
    setCommentContent(content);
    setValue(content);
  };

  const writeComment = async () => {
    if (commentContent.length < 1) {
      alert('댓글 내용은 비울 수 없습니다.');
      return;
    }
    await story.writeComment({
      content: commentContent,
      storyNo: no,
    });
    handleComment();
    setValue('');
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar>
        <TextField
          className={classes.marginRight}
          fullWidth
          id="standard-basic"
          label="댓글쓰기"
          value={value}
          onChange={checkComment}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={writeComment}
        >
          <Typography className={classes.whiteText}>작성</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ReplyField;
