import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { PlaceItem } from '..';
import List from '@material-ui/core/List';

const PlaceList = observer(() => {
  const search = useSearch();
  console.log(toJS(search.searchedPlace));
  return (
    <List>
      {toJS(search.searchedPlace).map((place) => (
        <PlaceItem place={place} key={place.name} />
      ))}
    </List>
  );
});

export default PlaceList;
