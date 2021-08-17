import React from 'react';
import { ImageList, ImageListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundImage: theme.palette.background.paper,
  },
}));
const HomePicTab = ({ datas }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {datas.length === 0 ? (
        <Typography>등록된 사진이 없습니다.</Typography>
      ) : (
        <ImageList>
          {datas.map((data) => (
            <ImageListItem key={data.photoNo + data.storyNo}>
              <img
                className={classes.img}
                src={
                  process.env.REACT_APP_IMAGE_BASE_URL +
                  data.userNickname +
                  '/' +
                  data.filePath
                }
                alt={data.tag}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
};

export default HomePicTab;
