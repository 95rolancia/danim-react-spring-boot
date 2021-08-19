import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import {
  makeStyles,
  alpha,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { Search, AccountCircle, Explore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  userIcon: {
    color: 'whitesmoke',
  },
  areaIcon: {
    color: 'whitesmoke',
  },
  searchIcon: {
    color: 'whitesmoke',
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

const Header = observer(() => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [searchType, setSearchType] = useState('지역 검색');
  const searchInputRef = useRef();
  const search = useSearch();

  const handleSearchMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchMenuSelect = (e) => {
    const target = e.target;
    setSearchType(target.textContent);
    searchInputRef.current.value = '';
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSearchMenuSelect}>사용자 검색</MenuItem>
      <MenuItem onClick={handleSearchMenuSelect}>지역 검색</MenuItem>
    </Menu>
  );

  const handleSearch = (e) => {
    if (searchType === '지역 검색')
      search.searchStory(searchInputRef.current.value);
    else search.searchUser(searchInputRef.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleSearchMenuOpen}
            color="inherit"
          >
            {searchType === '사용자 검색' ? (
              <AccountCircle className={classes.userIcon} />
            ) : (
              <Explore className={classes.areaIcon} />
            )}
          </IconButton>
          <form className={classes.search} onSubmit={submitHandler}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="검색 메뉴를 선택해주세요."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              inputRef={searchInputRef}
              onKeyUp={handleSearch}
            />
          </form>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
});

export default Header;
