import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import Slider from '../../components/slider/slider';
const datas = [
  {
    no: '1111',
    title: '혼밥하기 좋은곳',
    location: '대전 중구 대흥동',
  },
  {
    no: '1112',
    title: '대전에서 가장 조용한 곳',
    location: '대전 동구 가양동',
  },
  {
    no: '1113',
    title: '카페맛집',
    location: '대전 중구 은행동',
  },
  {
    no: '1114',
    title: '넓은 공원',
    location: '대전 유성구 봉명동',
  },
  {
    no: '1115',
    title: '낮잠자기 좋은 곳',
    location: '대전 중구 문창동',
  },
];
const Home = (props) => {
  return (
    <>
      <Box component="span" m={1}></Box>
      <div>
        <Button startIcon={<RoomIcon color="primary" />}>
          <Typography variant="h5">관심지역</Typography>
        </Button>
        의 여행루트
      </div>
      <Box component="span" m={1}></Box>
      <Slider datas={datas} />
      <Box component="span" m={1}></Box>
      <div>
        <Typography variant="h5">다님 인기 여행 Story</Typography>
      </div>
      <Box component="span" m={1}></Box>
      <Slider datas={datas} />
    </>
  );
};

export default Home;
