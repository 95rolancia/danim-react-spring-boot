import React from 'react';
import useBoardCreate from '../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  addPhotoButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderBoardCreateMemo = observer(({ title, onFileChange }) => {
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleFileChange = (e) => {
    boardCreate.handleLoading();
    onFileChange(e);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="go-back"
            onClick={goBack}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" className={classes.title} align="center">
            {title}
          </Typography>
          <Box className={classes.addPhotoButton}>
            <input
              type="file"
              id="input-file"
              accept={'.jpg, .png'}
              onChange={handleFileChange}
              multiple
              style={{ display: 'none' }}
            />
            <label htmlFor="input-file">
              <IconButton
                variant="extended"
                color="inherit"
                component="span"
                className={classes.button}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
          </Box>
          {/* <IconButton
            className={classes.addPhotoButton}
            color="inherit"
            aria-label="add-photo"
            onClick={handleFileChange}
          >
            <AddPhotoAlternateIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default HeaderBoardCreateMemo;
