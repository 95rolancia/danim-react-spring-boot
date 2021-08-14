import React from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { AreaList, UserList } from '../';

const Content = observer(() => {
  const search = useSearch();
  return <>{search.searchType === 'User' ? <UserList /> : <AreaList />}</>;
});

export default Content;
