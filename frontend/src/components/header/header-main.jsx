import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import notification from '../../service/notification';
import useUser from '../../hooks/useUser';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotiDialog from '../noti-dialog/noti-dialog';
import Badge from '@material-ui/core/Badge';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'MingukBold',
    color: '#36434C',
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  appBar: {
    position: 'relative',
  },
  noti: {
    width: '80%',
    textAlign: 'left',
  },
  notiTime: {
    width: '20%',
    textAlign: 'right',
  },
}));

const notiCnt = (notis) => {
  let result = 0;
  notis.forEach((noti) => {
    if (!noti.isRead) result++;
  });
  return result;
};

const HeaderMain = observer(() => {
  const classes = useStyles();
  const user = useUser();
  const history = useHistory();
  const [notis, setNotis] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    user.readNoti({
      nickname: toJS(user.user).nickname,
      notis: notis,
    });
  };

  const goToMain = () => {
    history.push('/main');
  };

  useEffect(() => {
    if (!toJS(user.user).nickname) {
      return;
    }

    const stopSync = notification.syncNoti(
      toJS(user.user).nickname,
      (notis) => {
        setNotis(notis);
      },
    );
    return () => stopSync();
  }, [user]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar className={classes.toolBar}>
          <Button edge="start" onClick={goToMain}>
            <Typography variant="h6" className={classes.title}>
              DANIM
            </Typography>
          </Button>
          <Badge badgeContent={notiCnt(notis)} color="secondary">
            <NotificationsNoneIcon onClick={handleClickOpen} />
          </Badge>
        </Toolbar>
      </AppBar>
      <NotiDialog
        isOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
        notis={notis}
      />
    </div>
  );
});

export default HeaderMain;
