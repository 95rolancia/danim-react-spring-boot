import React from 'react';
import { Button, Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
const datas = [
  {
    title: '혼밥하기 좋은곳',
    location: '대전 중구 대흥동',
  },
  {
    title: '대전에서 가장 조용한 곳',
    location: '대전 동구 가양동',
  },
  {
    title: '카페맛집',
    location: '대전 중구 은행동',
  },
  {
    title: '넓은 공원',
    location: '대전 유성구 봉명동',
  },
  {
    title: '낮잠자기 좋은 곳',
    location: '대전 중구 문창동',
  },
];
const Home = (props) => {
  return (
    <>
      <div>
        <Button startIcon={<RoomIcon color="primary" />}>
          <Typography variant="h5">관심지역</Typography>
        </Button>
        의 여행루트
      </div>
    </>
  );
};

export default Home;
