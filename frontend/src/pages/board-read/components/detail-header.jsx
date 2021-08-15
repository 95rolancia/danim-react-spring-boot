import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { BookmarkBorder, Clear } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'whitesmoke',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
}));
const DetailHeader = ({ num }) => {
  const classes = useStyles();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const routeSave = () => {
    alert(num + '번째 스토리 경로를 저장합니다.');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            aria-label="go-back"
            onClick={routeSave}
          >
            <BookmarkBorder />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            일정 지도
          </Typography>
          <IconButton
            className={classes.menuButton}
            aria-label="go-back"
            onClick={goBack}
          >
            <Clear />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default DetailHeader;
