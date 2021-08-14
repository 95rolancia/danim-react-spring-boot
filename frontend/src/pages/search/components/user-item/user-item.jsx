import React from 'react';
import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  user: {
    cursor: 'pointer',
  },
}));

const UserItem = ({ user }) => {
  const classes = useStyles();
  return (
    <>
      <ListItem className={classes.user}>
        <ListItemAvatar>
          <Avatar src={user.img} />
        </ListItemAvatar>
        <ListItemText primary={user.name} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};
export default UserItem;
