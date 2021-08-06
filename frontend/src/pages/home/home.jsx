import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import HomeRoot from './components/home-root';
import HomePic from './components/home-pic';
import useUser from '../../hooks/useUser';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
const datasRoot = [
  {
    no: '1111',
    title: '혼밥하기 좋은곳',
    location: '대전 중구 대흥동',
    thumbnail: 'https://picsum.photos/500',
  },
  {
    no: '1112',
    title: '대전에서 가장 조용한 곳',
    location: '대전 동구 가양동',
    thumbnail: 'https://picsum.photos/500',
  },
  {
    no: '1113',
    title: '카페맛집',
    location: '대전 중구 은행동',
    thumbnail: 'https://picsum.photos/500',
  },
  {
    no: '1114',
    title: '넓은 공원',
    location: '대전 유성구 봉명동',
    thumbnail: 'https://picsum.photos/500',
  },
  {
    no: '1115',
    title: '낮잠자기 좋은 곳',
    location: '대전 중구 문창동',
    thumbnail: 'https://picsum.photos/500',
  },
];
const datasPic = [
  {
    no: '1111',
    picNo: '1',
    pic: 'https://picsum.photos/id/1080/500',
    tag: 'food',
  },
  {
    no: '1111',
    picNo: '2',
    pic: 'https://picsum.photos/id/1013/500',
    tag: 'person',
  },
  {
    no: '1112',
    picNo: '3',
    pic: 'https://picsum.photos/id/1002/500',
    tag: 'scenery',
  },
  {
    no: '1112',
    picNo: '5',
    pic: 'https://picsum.photos/id/139/500',
    tag: 'food',
  },
  {
    no: '1112',
    picNo: '4',
    pic: 'https://picsum.photos/id/1005/500',
    tag: 'person',
  },
];
const options = ['여행루트', '여행사진'];

const Home = observer((props) => {
  const [interestRegions, setInterestRegions] = useState(null);
  const history = useHistory();
  const user = useUser();

  const [menu, setMenu] = useState(null);
  const [selectOptionIndex, setSelectOptionIndex] = useState(0);
  const [selectOptionValue, setSelectOptionValue] = useState('여행루트');
  const goToInterestModify = () => {
    history.push('/interest-modify');
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
    //유저의 관심지역 정보들 담기
    user.getUser().then((res) => {
      if (!res) {
        alert('사용자 정보 조회 실패!');
        return;
      }
      const userInterestArray = toJS(user.user).interests;
      let userInterest = '';
      for (let interest of userInterestArray) {
        userInterest += interest.area;
      }
      setInterestRegions(userInterest);
    });
  }, [user]);

  return (
    <>
      <Box component="span" m={1}></Box>
      <div>
        <Button
          startIcon={<RoomIcon color="primary" />}
          onClick={goToInterestModify}
        >
          <Typography variant="h5" component="span">
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
          <Typography variant="h5" component="span">
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
        <HomeRoot datas={datasRoot} />
      ) : (
        <HomePic datas={datasPic} />
      )}
    </>
  );
});

export default Home;
