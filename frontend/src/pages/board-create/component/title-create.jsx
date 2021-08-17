import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import { makeStyles, Typography, TextField, Fab, Box } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  titleBox: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  titleInput: {
    marginTop: theme.spacing(2),
  },
  button: {
    right: 0,
    bottom: theme.spacing(0),
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: '30px',
  },
}));

const TitleCreate = observer(({ onFileChange }) => {
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const [defaultTitle, setDefaultTitle] = useState();

  useEffect(() => {
    const makeDefaultTitle = () => {
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let day = ('0' + today.getDate()).slice(-2);

      return year + '-' + month + '-' + day + '의 일기';
    };
    setDefaultTitle(makeDefaultTitle());
  }, []);

  const handleTitleChange = (e) => {
    boardCreate.handleTitleChange(e.target.value);
  };

  const handleClick = (e) => {
    boardCreate.handleLoading();
    onFileChange(e);
  };

  return (
    <form>
      <div className={classes.titleBox}>
        <Typography variant="h6" component="h6">
          안녕하세요! {boardCreate.nickname}님!<br></br>
          새로운 여행의 제목을 알려주세요.
        </Typography>
        <TextField
          id="tripTitle"
          placeholder={defaultTitle}
          fullWidth
          autoFocus
          className={classes.titleInput}
          onChange={handleTitleChange}
        />
      </div>
      <Box display="flex" flexDirection="row-reverse">
        <input
          type="file"
          id="input-file"
          accept={'.jpg, .png'}
          onChange={handleClick}
          multiple
          style={{ display: 'none' }}
        />
        <label htmlFor="input-file">
          <Fab
            variant="extended"
            color="secondary"
            component="span"
            className={classes.button}
          >
            다음
            <NavigateNextIcon />
          </Fab>
        </label>
      </Box>
    </form>
  );
});

export default TitleCreate;
