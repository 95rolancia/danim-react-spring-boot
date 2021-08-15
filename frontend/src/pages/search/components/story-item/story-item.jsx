import React from 'react';
import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  story: {
    cursor: 'pointer',
  },
}));

const StoryItem = ({ story }) => {
  const classes = useStyles();
  const history = useHistory();
  const goToStory = () => {
    // 스토리 읽기
    // history.push(`/main/${user.nickname}`);
  };
  return (
    <>
      <ListItem className={classes.story} onClick={goToStory}>
        <ListItemAvatar>
          <Avatar
            src={
              process.env.REACT_APP_IMAGE_BASE_URL +
              story.nickname +
              '/' +
              story.photoFileName
            }
          />
        </ListItemAvatar>
        <ListItemText primary={story.title} secondary={story.nickname} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};
export default StoryItem;
