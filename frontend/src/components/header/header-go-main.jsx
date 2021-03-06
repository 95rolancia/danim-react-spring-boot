import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderGoMain = ({ title }) => {
  const classes = useStyles();
  const history = useHistory();

  const goToMain = () => {
    history.push('/main');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="go-back"
            onClick={goToMain}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderGoMain;
