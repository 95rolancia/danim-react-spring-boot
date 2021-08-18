import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import {
  makeStyles,
  Button,
  Grid,
  Fab,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { StoryCover, StoryContents } from './index';
import { toJS } from 'mobx';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    bottom: theme.spacing(0),
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    borderRadius: '30px',
  },
  buttonTextWhite: {
    bottom: theme.spacing(0),
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    borderRadius: '30px',
    color: 'white',
  },
}));

const MemoWrite = observer(({ onFileChange }) => {
  const history = useHistory();
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const [publishStatus, setPublishedStatus] = useState('PUBLISHED');
  // useEffect(() => {}, [boardCreate.photos]);

  const handleSubmitStory = () => {
    const obj = {
      // 이거 나중에 조금 더 고치기
      duration: toJS(boardCreate.tripDate.length),
      photos: toJS(boardCreate.photos),
      startDate: toJS(boardCreate.photos[0].date),
      status: publishStatus,
      thumbnail: toJS(boardCreate.thumbnail),
      title: toJS(boardCreate.title),
    };
    console.log(obj);
    boardCreate
      .setStory(obj)
      .then((res) => {
        console.log(res);
        if (res) {
          console.log('안', res);
          boardCreate.reset();
          history.push('/read/' + res.data);
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
      startDate: toJS(boardCreate.photos[0].date),
      status: 'TEMP',
      thumbnail: toJS(boardCreate.thumbnail),
      title: toJS(boardCreate.title),
    };
    console.log(obj);
    boardCreate
      .setStory(obj)
      .then((res) => {
        if (res) {
          console.log(res);
          boardCreate.reset();
          history.push('/read/' + res.data);
        } else {
          alert('스토리 못올려!!!!!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChecked = (e) => {
    const value = e.target.checked;
    boardCreate.handleIsTempChecked(value);
    if (e.target.checked) {
      setPublishedStatus('PRIVATED');
    }
  };

  return (
    <>
      <StoryCover />
      <StoryContents />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={boardCreate.isTempChecked}
                  onChange={handleChecked}
                  color="primary"
                />
              }
              label="일기 공개하기"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
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
            className={classes.buttonTextWhite}
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
