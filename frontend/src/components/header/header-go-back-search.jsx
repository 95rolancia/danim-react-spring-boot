import React from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  alpha,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
} from '@material-ui/core';

import { ArrowBack, Search } from '@material-ui/icons';
// import usePlan from '../../hooks/usePlan';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const HeaderGoBackSearch = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  // const plan = usePlan();

  const goBack = () => {
    history.goBack();
  };

  const searchPlace = (e) => {
    // plan.searchPlace(e.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="go-back"
          onClick={goBack}
        >
          <ArrowBack />
        </IconButton>
        <form className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder="관광지 검색"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={searchPlace}
          />
        </form>
      </Toolbar>
    </AppBar>
  );
});

export default HeaderGoBackSearch;
