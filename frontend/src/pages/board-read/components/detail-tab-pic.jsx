import React from 'react';
import useStory from '../../../hooks/useStory';
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  listPic: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(1),
  },
  storyDetail: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const DetailTabPic = ({ datas, nickname }) => {
  const classes = useStyles();
  const map = useStory();
  const moveMap = (lat, lng) => {
    map.setLatLng(lat, lng);
  };

  return (
    <List>
      {datas.photos.map((photo) => (
        <ListItem
          alignItems="flex-start"
          key={photo.photoNo}
          className={classes.storyDetail}
        >
          <ListItemAvatar>
            <Avatar
              className={classes.listPic}
              variant="rounded"
              alt="여행 일자별 사진"
              src={
                process.env.REACT_APP_IMAGE_BASE_URL +
                nickname +
                '/' +
                photo.filename
              }
              onClick={() => moveMap(photo.latitude, photo.longtitude)}
            />
          </ListItemAvatar>
          <ListItemText
            primary={photo.placeName}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {photo.address}
                </Typography>
                <br />
                {photo.content}
              </React.Fragment>
            }
          />

          <Button
            disableElevation
            color="secondary"
            onClick={() => moveMap(photo.latitude, photo.longtitude)}
          >
            <GpsFixedIcon />
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default DetailTabPic;
