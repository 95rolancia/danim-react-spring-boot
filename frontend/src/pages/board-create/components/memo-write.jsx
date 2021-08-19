import React, { useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { StoryCover, StoryContents } from './index';
import {
  makeStyles,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MemoWrite = observer(({ onFileChange }) => {
  const history = useHistory();
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const [publishStatus, setPublishedStatus] = useState('PUBLISHED');
  const [snackbarInfo, setSnackbarInfo] = useState({
    isShow: false,
    msg: '',
    state: '',
  });

  const handleSubmitStory = () => {
    const obj = {
      duration: boardCreate.tripDate.length,
      photos: toJS(boardCreate.photos),
      startDate: toJS(boardCreate.photos[0].date),
      status: publishStatus,
      thumbnail: boardCreate.thumbnail,
      title: boardCreate.title,
    };

    switch (boardCreate.status) {
      case 'TEMP':
        boardCreate.updateStory(obj).then((res) => {
          if (res) {
            history.push(`/main/${boardCreate.nickname}`);
          } else {
            setSnackbarInfo({
              isShow: true,
              msg: '스토리 작성에 오류가 발생했습니다.',
              state: 'error',
            });
          }
        });
        break;
      case '':
        boardCreate.setStory(obj).then((res) => {
          if (res) {
            history.push('/read/' + res.data);
          } else {
            setSnackbarInfo({
              isShow: true,
              msg: '스토리 작성에 오류가 발생했습니다.',
              state: 'error',
            });
          }
        });

        break;
      default:
        throw new Error(`unknown status ${boardCreate.status}`);
    }
    boardCreate.reset();
  };

  const handleSaveStory = () => {
    const obj = {
      duration: toJS(boardCreate.tripDate.length),
      photos: toJS(boardCreate.photos),
      startDate: toJS(boardCreate.photos[0].date),
      status: 'TEMP',
      thumbnail: toJS(boardCreate.thumbnail),
      title: toJS(boardCreate.title),
    };

    boardCreate.setStory(obj).then((res) => {
      if (res) {
        console.log(res);
        boardCreate.reset();
        history.push('/read/' + res.data);
      } else {
        setSnackbarInfo({
          isShow: true,
          msg: '스토리 임시 저장에 오류가 발생했습니다.',
          state: 'error',
        });
      }
    });
  };

  const handleChecked = (e) => {
    const value = e.target.checked;
    boardCreate.handleIsTempChecked(value);
    if (e.target.checked) {
      setPublishedStatus('PUBLISHED');
    } else {
      setPublishedStatus('PRIVATED');
    }
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarInfo({
      ...snackbarInfo,
      isShow: false,
    });
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
      <Snackbar
        open={snackbarInfo.isShow}
        autoHideDuration={700}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarInfo.state}>
          {snackbarInfo.msg}
        </Alert>
      </Snackbar>
    </>
  );
});

export default MemoWrite;
