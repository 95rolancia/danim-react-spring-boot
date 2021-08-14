import React from 'react';
import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  area: {
    cursor: 'pointer',
  },
}));

const AreaItem = ({ area }) => {
  const classes = useStyles();
  return (
    <>
      <ListItem className={classes.area}>
        <ListItemAvatar>
          <Avatar src={area.img} />
        </ListItemAvatar>
        <ListItemText primary={area.name} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};
export default AreaItem;
