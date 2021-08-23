import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { PlaceItem } from '..';
import { makeStyles, List, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  searchResult: {
    paddingTop: theme.spacing(6),
  },
  searchText: {
    fontFamily: 'MingukBold',
    color: '#36434C',
  },
}));

const PlaceList = observer(() => {
  const classes = useStyles();
  const search = useSearch();

  return (
    <>
      {toJS(search.searchedPlace).length > 0 ? (
        <List>
          {toJS(search.searchedPlace).map((place) => (
            <PlaceItem place={place} key={place.name} />
          ))}
        </List>
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
    </>
  );
});

export default PlaceList;
