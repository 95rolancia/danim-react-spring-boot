import React from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { StoryList, UserList } from '../';
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
      {search.searchType === 'User' ? (
        search.searchedUser.length > 0 ? (
          <UserList />
        ) : (
          <h2>검색 결과가 없습니다.</h2>
        )
      ) : search.searchedStory.length > 0 ? (
        <StoryList />
      ) : (
        <h2>검색 결과가 없습니다.</h2>
      )}
    </section>
  );
});

export default Content;
