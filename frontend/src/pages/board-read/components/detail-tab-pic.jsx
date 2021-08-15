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
const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  listPic: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(1),
  },
}));

const DetailTabPic = ({ datas, nickname }) => {
  const classes = useStyles();
  const map = useStory();
  const handleBookMark = (lat, lng) => {
    alert(lat + ' ' + lng);
  };
  const moveMap = (lat, lng) => {
    map.setLatLng(lat, lng);
  };

  return (
    <List>
      {datas.photos.map((photo) => (
        <ListItem alignItems="flex-start" key={photo.latitude}>
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
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => handleBookMark(photo.latitude, photo.longtitude)}
          >
            담기
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default DetailTabPic;
