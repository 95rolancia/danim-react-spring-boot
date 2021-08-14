import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { AreaItem } from '../';
import { List } from '@material-ui/core';

const AreaList = observer(() => {
  const search = useSearch();

  return (
    <List>
      {search.searchedArea &&
        toJS(search.searchedArea).map((area) => (
          <AreaItem area={area} key={area.name} />
        ))}
    </List>
  );
});

export default AreaList;
