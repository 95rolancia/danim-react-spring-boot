import React from 'react';
import {
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  makeStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useAuth from '../../../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logout: {
    color: 'red',
  },
}));

const Setting = ({ isShowSetting, hideSetting, history, nickname }) => {
  const classes = useStyles();
  const auth = useAuth();

  const handleSignout = () => {
    auth.signOut();
    history.push('/');
  };

  return (
    <Dialog fullScreen open={isShowSetting} onClose={hideSetting}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={hideSetting}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {nickname}
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button onClick={() => history.push('/main/account/edit')}>
          <ListItemText primary="프로필 편집" />
        </ListItem>
        <Divider />
        <Divider />
        <ListItem button>
          <ListItemText primary="비밀번호 변경" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleSignout}>
          <ListItemText className={classes.logout} primary="로그아웃" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default Setting;
