import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import { makeStyles, Container, Button, Grid, Fab } from '@material-ui/core';
import { StoryCover, StoryContents } from './index';
import { toJS } from 'mobx';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    bottom: theme.spacing(0),
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: '30px',
  },
}));

const MemoWrite = observer((props) => {
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  // useEffect(() => {}, [boardCreate.photos]);

  const watchPhoto = () => {
    console.log(toJS(boardCreate.title));
    console.log(toJS(boardCreate.photos));
    console.log(toJS(Date.parse(boardCreate.photos[0].date)));
  };

  const handleSubmitStory = () => {
    // console.log(boardCreate.tripDate);
    const obj = {
      // 이거 나중에 조금 더 고치기
      duration: toJS(boardCreate.tripDate.length),
      photos: toJS(boardCreate.photos),
      startDate: toJS(boardCreate.photos[0].date),
      status: 'PUBLISHED',
      thumbnail: toJS(boardCreate.photos[0].filename),
      title: toJS(boardCreate.title),
    };
    console.log(obj);
    boardCreate
      .setStory(obj)
      .then((res) => {
        if (res) {
          console.log(res);
        } else {
          alert('스토리 못올려!!!!!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveStory = () => {
    // console.log(boardCreate.tripDate);
    const obj = {
      // 이거 나중에 조금 더 고치기
      duration: toJS(boardCreate.tripDate.length),
      photos: toJS(boardCreate.photos),
      startDate: toJS(boardCreate.photos[0].date).slice(0, 10),
      status: 'TEMP',
      thumbnail: toJS(boardCreate.photos[0].filename),
      title: toJS(boardCreate.title),
    };
    console.log(obj);
    boardCreate
      .setStory(obj)
      .then((res) => {
        if (res) {
          console.log(res);
        } else {
          alert('스토리 못올려!!!!!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <StoryCover />
      <StoryContents />
      <Button onClick={watchPhoto}>포토보자</Button>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component="span"
            className={classes.button}
            onClick={handleSaveStory}
          >
            임시저장
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component="span"
            className={classes.button}
            onClick={handleSubmitStory}
          >
            등록완료
          </Button>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
});

export default MemoWrite;
