import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useStory from '../hooks/useStory';
import { makeStyles } from '@material-ui/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { StoryDetail } from '../pages';

const useStyle = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const StoryDetailRoute = observer(({ children, ...rest }) => {
  const classes = useStyle();
  const [loading, setLoading] = useState(true);
  const [detailStory, setDetailStory] = useState({});
  const [storyNum, setStoryNum] = useState(0);
  const story = useStory();

  useEffect(() => {
    const no = rest.computedMatch.params.no;
    setStoryNum(no);
    story.getStory(no).then((res) => {
      if (res) {
        const data = res;

        for (let i = 0; i < data['substories'].length; i++) {
          for (let j = 0; j < data['substories'][i].photos.length; j++) {
            data['substories'][i].photos[j].latitude = Number(
              data['substories'][i].photos[j].latitude,
            );
            data['substories'][i].photos[j].longtitude = Number(
              data['substories'][i].photos[j].longtitude,
            );
          }
        }

        setDetailStory(data);
      }
      setLoading(false);
    });
  }, [rest.computedMatch.params.no, story]);

  if (loading)
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    );

  return (
    <Route render={() => <StoryDetail datas={detailStory} no={storyNum} />} />
  );
});

export default StoryDetailRoute;
