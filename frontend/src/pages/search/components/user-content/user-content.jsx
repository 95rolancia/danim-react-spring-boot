import React from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { UserList } from '../';
import { SearchContentLoader } from '../../../../components';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  searchResult: {
    textAlign: 'center',
    paddingTop: theme.spacing(6),
  },
  searchText: {
    fontFamily: 'MingukBold',
    color: '#36434C',
  },
}));

const UserContent = observer(() => {
  const search = useSearch();
  const classes = useStyles();

  return search.searchUserState === 'pending' ? (
    <SearchContentLoader />
  ) : search.searchedUser.length > 0 ? (
    <UserList />
  ) : (
    <section className={classes.searchResult}>
      <img
        src="/images/danilogo.png"
        alt="logo"
        width="70em"
        height="50em"
      ></img>
      <Typography variant="h5" component="h5" className={classes.searchText}>
        검색 결과가 없습니다.
      </Typography>
    </section>
  );
});

export default UserContent;
