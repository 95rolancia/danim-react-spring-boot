import React from 'react';
import { makeStyles, Button, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  titleBox: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  titleInput: {
    marginTop: theme.spacing(2),
  },
  button: {
    bottom: theme.spacing(0),
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: '30px',
  },
}));

const TitleCreate = ({
  nickname,
  defaultTitle,
  onTitleChange,
  onFileChange,
  onPageChange,
}) => {
  const classes = useStyles();

  const handleTitleChange = (e) => {
    onTitleChange(e);
  };

  const handleClick = (e) => {
    onFileChange(e);
    onPageChange();
  };

  return (
    <form>
      <div className={classes.titleBox}>
        <Typography variant="h6" component="h6">
          안녕하세요 {nickname}님! <br></br>
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
      <div>
        <input
          type="file"
          id="input-file"
          accept={'.jpg, .png'}
          onChange={handleClick}
          multiple
          style={{ display: 'none' }}
        />
        <label htmlFor="input-file">
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component="span"
            className={classes.button}
          >
            사진추가
          </Button>
        </label>
      </div>
    </form>
  );
};

export default TitleCreate;
