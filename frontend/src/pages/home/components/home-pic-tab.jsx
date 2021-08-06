import { ImageList, ImageListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

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

  const handleStory = (no) => {
    console.log(no);
  };
  return (
    <div className={classes.root}>
      <ImageList>
        {datas.map((data) => (
          <ImageListItem key={data.pic} onClick={() => handleStory(data.no)}>
            <img className={classes.img} src={data.pic} alt={data.tag} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default HomePicTab;
