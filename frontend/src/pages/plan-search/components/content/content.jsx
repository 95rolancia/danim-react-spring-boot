import React from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { PlaceList } from '../';
import { makeStyles } from '@material-ui/core';
import { SearchContentLoader } from '../../../../components';

const useStyles = makeStyles((theme) => ({
  content: {
    textAlign: 'center',
  },
  searchResult: {
    paddingTop: theme.spacing(6),
  },
  searchText: {
    fontFamily: 'MingukBold',
    color: '#36434C',
  },
}));

const Content = observer(() => {
  const search = useSearch();
  const classes = useStyles();
  return (
    <section className={classes.content}>
      {search.searchPlaceState === 'pending' ? (
        <SearchContentLoader />
      ) : (
        <PlaceList />
      )}
    </section>
  );
});

export default Content;
