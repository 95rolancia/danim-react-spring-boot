import React from 'react';
import { useHistory } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    color: 'whitesmoke',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  header: {
    backgroundColor: 'black',
    opacity: '0.9',
  },
  marquee: {
    width: '80%',
  },
}));

const Header = ({ title, num }) => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const goToDetail = () => {
    history.push('/detail/' + num);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            aria-label="go-back"
            onClick={goBack}
          >
            <ArrowBack />
          </IconButton>
          <Marquee
            gradientColor={[0, 0, 0]}
            speed="40"
            pauseOnClick="true"
            className={classes.marquee}
          >
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Marquee>
          <Button variant="outlined" color="secondary" onClick={goToDetail}>
            DETAIL
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
