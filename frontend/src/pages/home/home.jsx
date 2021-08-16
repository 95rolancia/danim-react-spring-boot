import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { HomeRoot, HomePic, MainHeader } from './components';
import useUser from '../../hooks/useUser';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
const datasRoot = [
  {
    duration: 2,
    startDate: '2021-08-09',
    thumbnail: 'https://picsum.photos/id/103/500',
    title: '바람이 불어오는 나의 제주도 여행기',
    location: '제주',
    author: '영구',
    storyNum: 2,
  },
];
const datasPic = [
  {
    no: '1111',
    picNo: '1',
    pic: 'https://picsum.photos/id/1080/500',
    tag: 'FOOD',
  },
  {
    no: '1111',
    picNo: '2',
    pic: 'https://picsum.photos/id/1013/500',
    tag: 'PERSON',
  },
  {
    no: '1112',
    picNo: '3',
    pic: 'https://picsum.photos/id/1002/500',
    tag: 'SCENERY',
  },
  {
    no: '1112',
    picNo: '5',
    pic: 'https://picsum.photos/id/139/500',
    tag: 'FOOD',
  },
  {
    no: '1112',
    picNo: '4',
    pic: 'https://picsum.photos/id/1005/500',
    tag: 'PERSON',
  },
];
const options = ['여행루트', '여행사진'];
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'MingukBold',
  },
}));
const Home = observer((props) => {
  const classes = useStyles();
  const [interestRegions, setInterestRegions] = useState(null);
  const [interestArray, setInterestArray] = useState([]);
  const history = useHistory();
  const user = useUser();

  const [menu, setMenu] = useState(null);
  const [selectOptionIndex, setSelectOptionIndex] = useState(0);
  const [selectOptionValue, setSelectOptionValue] = useState('여행루트');
  const goToInterestModify = () => {
    history.push({
      pathname: '/interest',
      state: { prevPath: history.location.pathname },
    });
  };

  const openMenu = (e) => {
    setMenu(e.currentTarget);
  };

  const handleClose = (e) => {
    setMenu(null);
  };

  const handleMenuItem = (e, index) => {
    setSelectOptionIndex(index);
    setSelectOptionValue(options[index]);
    setMenu(null);
  };

  useEffect(() => {
    const userInterestArray = toJS(user.user).areas;
    setInterestArray(userInterestArray);
    let userInterest = '';
    for (let interest of userInterestArray) {
      userInterest += interest;
    }
    setInterestRegions(userInterest);
  }, [user.user]);

  return (
    <>
      <MainHeader />
      <Box component="span" m={1}></Box>
      <div>
        <Button
          startIcon={<RoomIcon color="primary" />}
          onClick={goToInterestModify}
        >
          <Typography variant="h5" component="span" className={classes.title}>
            {interestRegions}
          </Typography>
        </Button>
        의
        <Button
          color="secondary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openMenu}
        >
          <Typography variant="h5" component="span" className={classes.title}>
            #{selectOptionValue}
          </Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              onClick={(e) => handleMenuItem(e, index)}
              selected={index === selectOptionIndex}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <Box component="span" m={1}></Box>
      {selectOptionValue === '여행루트' ? (
        <HomeRoot datas={datasRoot} interests={interestArray} />
      ) : (
        <HomePic datas={datasPic} />
      )}
    </>
  );
});

export default Home;
