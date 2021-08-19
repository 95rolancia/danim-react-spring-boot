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
  buttonGroup: {
    marginBottom: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonSubmit: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    borderRadius: '1em',
    color: 'whitesmoke',
  },
  buttonSave: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
    borderRadius: '1em',
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
      status: boardCreate.isTempChecked ? 'PUBLISHED' : 'PRIVATED',
      thumbnail: boardCreate.thumbnail,
      title: boardCreate.title,
    };

    if (boardCreate.isExist) {
      boardCreate.updateStory(obj).then((res) => {
        history.push(`/main/${boardCreate.nickname}`);
      });
    } else {
      boardCreate.setStory(obj).then((res) => {
        history.push('/read/' + res.data);
      });
    }
    boardCreate.reset();
  };

  const handleSaveStory = () => {
    const obj = {
      duration: boardCreate.tripDate.length,
      photos: toJS(boardCreate.photos),
      startDate: toJS(boardCreate.photos[0].date),
      status: 'TEMP',
      thumbnail: boardCreate.thumbnail,
      title: boardCreate.title,
    };

    if (boardCreate.status === 'TEMP') {
      boardCreate.updateStory(obj).then((res) => {
        history.push(`/main/${boardCreate.nickname}`);
      });
    }

    boardCreate.reset();
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
        <section className={classes.buttonGroup}>
          {boardCreate.status === 'TEMP' && (
            <Button
              variant="outlined"
              color="primary"
              component="span"
              className={classes.buttonSave}
              onClick={handleSaveStory}
            >
              임시저장
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.buttonSubmit}
            onClick={handleSubmitStory}
          >
            등록완료
          </Button>
        </section>
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
