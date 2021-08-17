import React from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { StoryList, UserList } from '../';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';

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
      {search.searchType === 'User' ? (
        search.searchedUser.length > 0 ? (
          <UserList />
        ) : (
          <section className={classes.searchResult}>
            <img
              src="/images/danilogo.png"
              alt="logo"
              width="70em"
              height="50em"
            ></img>
            <Typography
              variant="h5"
              component="h5"
              className={classes.searchText}
            >
              검색 결과가 없습니다.
            </Typography>
          </section>
        )
      ) : search.searchedStory.length > 0 ? (
        <StoryList />
      ) : (
        <section className={classes.searchResult}>
          <img
            src="/images/danilogo.png"
            alt="logo"
            width="70em"
            height="50em"
          ></img>
          <Typography
            variant="h5"
            component="h5"
            className={classes.searchText}
          >
            검색 결과가 없습니다.
          </Typography>
        </section>
      )}
    </section>
  );
});

export default Content;
