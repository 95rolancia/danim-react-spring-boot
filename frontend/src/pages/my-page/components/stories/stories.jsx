import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
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
  Menu,
  MenuItem,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
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
  story: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInfo: {
    textAlign: 'center',
  },
  managerOptions: {
    paddingTop: theme.spacing(1),
  },
}));

const Stories = observer(({ stories, handleStory, isManager }) => {
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List>
        {stories.map((story) => (
          <ListItem
            className={classes.story}
            alignItems="flex-start"
            key={story.storyNo}
          >
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
              className={classes.storyInfo}
              primary={story.title}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`${story.duration - 1}박 ${story.duration}일`}
                </Typography>
              }
            />

            {isManager && (
              <section className={classes.managerOptions}>
                <MoreVert onClick={handleClick} />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  elevation={1}
                >
                  {/* 나중에 수정, 삭제 클릭할 때 handleClose도 처리 해줘야 함 */}
                  <MenuItem onClick={handleClose}>수정</MenuItem>
                  <MenuItem onClick={handleClose}>삭제</MenuItem>
                </Menu>
              </section>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
});

export default Stories;
