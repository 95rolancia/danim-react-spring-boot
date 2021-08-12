import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import {
  AppBar,
  BottomNavigation as BN,
  BottomNavigationAction as BNAction,
  makeStyles,
} from '@material-ui/core';
import {
  Home,
  Search,
  BookmarkBorder,
  PersonOutlineOutlined,
  Create,
} from '@material-ui/icons';
import useUser from '../../hooks/useUser';

const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom: 0,
    position: 'fixed',
  },
});

const Navbar = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const user = useUser();

  const selectMenu = (_, selectedMenu) => {
    setValue(selectedMenu);
  };

  const goToMain = () => {
    history.push('/main');
  };

  const goToSearch = () => {
    history.push('/main/search');
  };

  const goToBoardCreate = () => {
    history.push('/create');
  };

  const goToBookmark = () => {
    history.push('/main/bookmark');
  };

  const goToMyPage = () => {
    history.push(`/main/${toJS(user.user).nickname}`);
  };

  return (
    <AppBar>
      <BN className={classes.root} value={value} onChange={selectMenu}>
        <BNAction icon={<Home />} onClick={goToMain} />
        <BNAction icon={<Search />} onClick={goToSearch} />
        <BNAction icon={<Create />} onClick={goToBoardCreate} />
        <BNAction icon={<BookmarkBorder />} onClick={goToBookmark} />
        <BNAction icon={<PersonOutlineOutlined />} onClick={goToMyPage} />
      </BN>
    </AppBar>
  );
});

export default Navbar;
