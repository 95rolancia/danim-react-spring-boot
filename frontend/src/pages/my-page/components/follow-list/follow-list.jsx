import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
  },
  appBar: {
    backgroundColor: '#fafafa',
  },
}));

const FollowList = ({ userInfo }) => {
  const classes = useStyles();
  const history = useHistory();
  const [openFollowing, setOpenFollowing] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const [selectedFollowingValue, setSelectedFollowingValue] = useState([]);
  const [selectedFollowerValue, setSelectedFollowerValue] = useState([]);

  const handleFollowingOpen = () => {
    setOpenFollowing(true);
  };

  const handleFollowerOpen = () => {
    setOpenFollower(true);
  };

  const handleFollwingClose = (value) => {
    setOpenFollowing(false);
    setSelectedFollowingValue(value);
  };

  const handleFollwerClose = (value) => {
    setOpenFollower(false);
    setSelectedFollowerValue(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Button className={classes.title} onClick={handleFollowingOpen}>
            <Typography component="span">팔로잉</Typography>
            <Typography component="span" color="primary">
              {userInfo.followingCnt}
            </Typography>
          </Button>
          <Button className={classes.title} onClick={handleFollowerOpen}>
            <Typography component="span">팔로워</Typography>
            <Typography component="span" color="secondary">
              {userInfo.followerCnt}
            </Typography>
          </Button>
          <FollowingDialog
            setSelectedFollowingValue={selectedFollowingValue}
            open={openFollowing}
            onClose={handleFollwingClose}
            userInfo={userInfo}
            history={history}
          />
          <FollowerDialog
            selectedValue={selectedFollowerValue}
            open={openFollower}
            onClose={handleFollwerClose}
            userInfo={userInfo}
            history={history}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default FollowList;
function FollowingDialog(props) {
  const classes = useStyles();
  const { onClose, setSelectedFollowingValue, open, userInfo } = props;
  const handleClose = () => {
    onClose(setSelectedFollowingValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
    window.location.href = '/main/' + value;
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">팔로잉 목록</DialogTitle>
      <List>
        {userInfo.followingList.map((following) => (
          <ListItem
            button
            onClick={() => handleListItemClick(following.nickname)}
            key={following.nickname}
          >
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="팔로잉 아바타"
                src={
                  process.env.REACT_APP_IMAGE_BASE_URL +
                  following.nickname +
                  '/' +
                  following.profile
                }
              />
            </ListItemAvatar>
            <ListItemText primary={following.nickname} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

FollowingDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedFollowingValue: PropTypes.string,
};

function FollowerDialog(props) {
  const classes = useStyles();
  const { onClose, selectedFollowerValue, open, userInfo } = props;
  const handleClose = () => {
    onClose(selectedFollowerValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    window.location.href = '/main/' + value;
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">팔로워 목록</DialogTitle>
      <List>
        {userInfo.followerList.map((follower) => (
          <ListItem
            button
            key={follower.nickname}
            onClick={() => handleListItemClick(follower.nickname)}
          >
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt="팔로워 아바타"
                src={
                  process.env.REACT_APP_IMAGE_BASE_URL +
                  follower.nickname +
                  '/' +
                  follower.profile
                }
              />
            </ListItemAvatar>
            <ListItemText primary={follower.nickname} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

FollowerDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedFollowerValue: PropTypes.string,
};
