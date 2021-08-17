import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  IconButton,
  Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { notiTemplate } from '../../util/noti-template';

const formatter = buildFormatter(koreanStrings);

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
  noti: {
    width: '80%',
    textAlign: 'left',
  },
  notiTime: {
    width: '20%',
    textAlign: 'right',
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
        {notis.map((noti) => (
          <>
            <ListItem button key={noti}>
              <ListItemText
                primary={notiTemplate(noti)}
                className={classes.noti}
              />
              <TimeAgo
                date={noti.createdAt}
                formatter={formatter}
                className={classes.notiTime}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Dialog>
  );
};

export default NotiDialog;
