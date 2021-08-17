import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  List,
  IconButton,
  Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { NotiList } from './components';
import { observer } from 'mobx-react-lite';
import useUser from '../../hooks/useUser';
import { toJS } from 'mobx';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
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
}));

const NotiDialog = observer(({ isOpen, handleDialogClose, notis }) => {
  const classes = useStyles();
  const user = useUser();

  const onCloseClick = () => {
    handleDialogClose();
    user.readNoti({
      nickname: toJS(user.user).nickname,
      notis: notis,
    });
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onCloseClick}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCloseClick}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            알림
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <NotiList notis={notis} />
      </List>
    </Dialog>
  );
});

export default NotiDialog;
