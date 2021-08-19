import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
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
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
  title: {
    fontFamily: 'MingukBold',
  },
  withDrawlButton: {
    color: 'red',
  },
}));

const Setting = ({ isShowSetting, hideSetting, history, nickname }) => {
  const classes = useStyles();
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignout = () => {
    auth.signOut();
    history.push('/');
  };

  const handleWithdrawl = () => {
    auth.withdrawl().then((res) => {
      if (res) {
        auth.signOut();
        history.push('/');
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      className={classes.root}
      fullScreen
      open={isShowSetting}
      onClose={hideSetting}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="secondary"
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
        <ListItem
          button
          onClick={() => history.push('/main/account/change-password')}
        >
          <ListItemText primary="비밀번호 변경" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleSignout}>
          <ListItemText className={classes.logout} primary="로그아웃" />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleClickOpen}>
          <ListItemText className={classes.logout} primary="회원 탈퇴" />
        </ListItem>
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          정말 회원 탈퇴 하시겠습니까?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            작성된 모든 게시글과 댓글이 삭제될 수 있습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            취소
          </Button>
          <Button onClick={handleWithdrawl} className={classes.withDrawlButton}>
            탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default Setting;
