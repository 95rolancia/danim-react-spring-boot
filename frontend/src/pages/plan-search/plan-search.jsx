import React from 'react';
import { HeaderGoBackSearch } from '../../components';
import PlaceList from './components/place-list/place-list';

const PlanSearch = (props) => {
  return (
    <>
      <HeaderGoBackSearch />
      <PlaceList />
    </>
  );
};

export default PlanSearch;
