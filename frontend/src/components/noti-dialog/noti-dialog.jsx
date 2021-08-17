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

const NotiDialog = ({ isOpen, handleDialogClose, notis }) => {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleDialogClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDialogClose}
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
};

export default NotiDialog;
