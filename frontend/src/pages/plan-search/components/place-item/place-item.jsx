import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { getPlaceImgUrl } from '../../../../util/img-url-creator';

const useStyles = makeStyles((theme) => ({
  story: {
    cursor: 'pointer',
  },
}));

const PlaceItem = ({ place }) => {
  const classes = useStyles();
  const history = useHistory();
  const goToPlaceInfo = () => {
    history.push(`/main/place/${place.name}`);
  };
  return (
    <>
      <ListItem className={classes.place} onClick={goToPlaceInfo}>
        <ListItemAvatar>
          <Avatar src={getPlaceImgUrl(place.thumbnail)} />
        </ListItemAvatar>
        <ListItemText primary={place.name} secondary={place.type} />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};
export default PlaceItem;
