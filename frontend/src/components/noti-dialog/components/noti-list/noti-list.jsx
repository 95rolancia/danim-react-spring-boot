import React from 'react';
import List from '@material-ui/core/List';
import NotiItem from '../noti-item/noti-item';

const NotiList = ({ notis }) => {
  return (
    <List>
      {notis.map((noti) => (
        <NotiItem noti={noti} key={noti.uuid} />
      ))}
    </List>
  );
};

export default NotiList;
