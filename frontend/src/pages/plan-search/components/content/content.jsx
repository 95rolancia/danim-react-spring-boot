import React from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { PlaceList } from '../';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    textAlign: 'center',
  },
}));

const Content = observer(() => {
  const search = useSearch();
  const classes = useStyles();
  return (
    <section className={classes.content}>
      {search.searchedPlace.length > 0 ? (
        <PlaceList />
      ) : (
        <h2>검색 결과가 없습니다.</h2>
      )}
    </section>
  );
});

export default Content;
