import { useContext } from 'react';
import { SearchContext } from '../stores';

const useSearch = () => {
  return useContext(SearchContext);
};

export default useSearch;
