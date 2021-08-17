import React from 'react';
import { useHistory } from 'react-router-dom';
import { notiTemplate } from '../../../../util/noti-template';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { makeStyles, ListItem, ListItemText, Divider } from '@material-ui/core';

const formatter = buildFormatter(koreanStrings);

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: 'pointer',
  },
  noti: {
    width: '75%',
    textAlign: 'left',
  },
  notiTime: {
    width: '25%',
    textAlign: 'right',
  },
  unread: {
    backgroundColor: 'whitesmoke',
  },
}));

const getStyles = (classes, type) => {
  switch (type) {
    case true:
      return classes.read;
    case false:
      return classes.unread;
    default:
      throw new Error(`unknown type: ${type}`);
  }
};

const NotiItem = ({ noti }) => {
  const classes = useStyles();
  const history = useHistory();

  const notiClick = () => {
    switch (noti.type) {
      case 'follow':
      case 'love':
        history.push(`/main/${noti.from}`);
        break;
      case 'comment':
        history.push(`/detail/${noti.storyNo}`);
        break;
      default:
        throw new Error(`unknown noti type ${noti.type}`);
    }
  };

  return (
    <>
      <ListItem onClick={notiClick} className={getStyles(classes, noti.isRead)}>
        <ListItemText primary={notiTemplate(noti)} className={classes.noti} />
        <TimeAgo
          date={noti.createdAt}
          formatter={formatter}
          className={classes.notiTime}
        />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};

export default NotiItem;
