import React from 'react';
import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  user: {
    cursor: 'pointer',
  },
}));

const UserItem = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const goToMyPage = () => {
    history.push(`/main/${user.nickname}`);
  };

  return (
    <>
      <ListItem className={classes.user} onClick={goToMyPage}>
        <ListItemAvatar>
          <Avatar
            src={
              process.env.REACT_APP_IMAGE_BASE_URL +
              user.nickname +
              '/' +
              user.profile
            }
          />
        </ListItemAvatar>
        <ListItemText primary={user.nickname} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};
export default UserItem;
