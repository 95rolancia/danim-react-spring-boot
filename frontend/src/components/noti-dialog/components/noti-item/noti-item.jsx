import React from 'react';
import { useHistory } from 'react-router-dom';
import { notiTemplate } from '../../../../util/noti-template';
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { makeStyles, ListItem, ListItemText, Divider } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import useUser from '../../../../hooks/useUser';
import { toJS } from 'mobx';

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

const NotiItem = observer(({ noti }) => {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();

  const notiClick = () => {
    user.readNoti({
      nickname: toJS(user.user).nickname,
      notis: [noti],
    });

    switch (noti.type) {
      case 'comment':
      case 'love':
        history.push(`/detail/${noti.storyNo}`);
        break;
      case 'follow':
        history.push(`/main/${noti.from}`);
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
});

export default NotiItem;
