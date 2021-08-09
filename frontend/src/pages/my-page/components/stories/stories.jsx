import React from 'react';
import { memo } from 'react';
import { makeStyles, ImageList, ImageListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Stories = memo(({ stories }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={3}>
        {stories.map((story) => (
          <ImageListItem
            className={classes.imageListItem}
            key={story.storyNo}
            cols={story.cols || 1}
          >
            <img src={story.thumbnail} alt={story.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
});

export default Stories;
