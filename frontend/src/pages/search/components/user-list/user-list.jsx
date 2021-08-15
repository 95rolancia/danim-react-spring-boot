import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { UserItem } from '../';
import { List } from '@material-ui/core';

const UserList = observer(() => {
  const search = useSearch();
  return (
    <List>
      {toJS(search.searchedUser).map((user) => (
        <UserItem user={user} key={user.nickname} />
      ))}
    </List>
  );
});

export default UserList;
