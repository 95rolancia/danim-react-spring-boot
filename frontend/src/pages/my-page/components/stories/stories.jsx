import React from 'react';
import { useHistory } from 'react-router-dom';
import { memo } from 'react';
import { toJS } from 'mobx';
import useUser from '../../../../hooks/useUser';
import useStory from '../../../../hooks/useStory';
import {
  makeStyles,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  listPic: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(1),
  },
  inline: {
    display: 'inline',
  },
  button: {
    color: 'white',
  },
}));

const Stories = memo(({ stories, handleStory }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();
  const story = useStory();
  const [currentAccount, setCurrentAccount] = useState({});

  useEffect(() => {
    setCurrentAccount(toJS(user.user.nickname));
  }, [user]);

  const readStory = (storyNo) => {
    history.push('/read/' + storyNo);
  };

  const deleteStory = (storyNo) => {
    // story.deleteStory({ storyNo: storyNo }).then((res) => {
    //   handleStory();
    // });
    alert('스웨거 temp로 되어있음(무슨뜻인가요..?)');
  };
  return (
    <div className={classes.root}>
      <List>
        {stories.map((story) => (
          <ListItem alignItems="flex-start" key={story.storyNo}>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={story.title}
                className={classes.listPic}
                src={
                  process.env.REACT_APP_IMAGE_BASE_URL +
                  story.nickname +
                  '/' +
                  story.thumbnail
                }
                onClick={() => readStory(story.storyNo)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={story.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    총 {story.duration}일
                  </Typography>
                </React.Fragment>
              }
            />
            {currentAccount === story.nickname ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteStory(story.storyNo)}
                disableElevation
              >
                <Close className={classes.button} />
              </Button>
            ) : (
              <></>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
});

export default Stories;
