import React from 'react';
import { observer } from 'mobx-react-lite';
import useStory from '../../hooks/useStory';
import {
  DetailHeader,
  BoardDetailMap,
  DetailTab,
  ReplyList,
  LoveList,
} from './components';
import { Divider } from '@material-ui/core';

const StoryDetail = observer(({ datas, no, handleLike }) => {
  const story = useStory();

  return (
    <>
      <DetailHeader num={no} />
      <BoardDetailMap stories={datas} lat={story.lat} lng={story.lng} />
      <DetailTab datas={datas} nickname={datas.nickname} />
      <Divider />
      <LoveList
        love={datas.isLove}
        loveCnt={datas.loveCount}
        no={no}
        handleLike={handleLike}
      />
      <ReplyList />
    </>
  );
});

export default StoryDetail;
