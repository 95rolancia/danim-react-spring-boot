import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { HeaderGoBack } from '../../../../components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'MingukBold',
    color: '#F5F5F5',
  },
}));

const Header = ({ showSetting, isManager, userInfo }) => {
  const classes = useStyles();
  return (
    <>
      {isManager ? (
        <div className={classes.root}>
          <AppBar position="static" elevation={1}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="secondary"
                aria-label="show-setting"
                onClick={showSetting}
              >
                <SettingsIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {userInfo.nickname}
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <HeaderGoBack />
      )}
    </>
  );
};

export default Header;
