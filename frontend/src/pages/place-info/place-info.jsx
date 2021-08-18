import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { HeaderGoBack } from '../../components';
import { PlaceDetailInfo } from './components';
import useSearch from '../../hooks/useSearch';
import { CircularProgress } from '@material-ui/core';

const PlaceInfo = observer(() => {
  const search = useSearch();
  const params = useParams();

  useEffect(() => {
    search.getPlaceInfo(params.placeName);
  }, [search, params.placeName]);

  return (
    <>
      <HeaderGoBack />
      {search.placeDetailInfo ? <PlaceDetailInfo /> : <CircularProgress />}
    </>
  );
});

export default PlaceInfo;
