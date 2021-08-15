import React from 'react';
import { observer } from 'mobx-react-lite';
import useStory from '../../hooks/useStory';
import { BoardDetailMap } from '../../components/index';
import DetailHeader from './components/detail-header';
import DetailTab from './components/detail-tab';

const StoryDetail = observer(({ datas, no }) => {
  const story = useStory();
  return (
    <>
      <DetailHeader num={no} />
      <BoardDetailMap stories={datas} lat={story.lat} lng={story.lng} />
      <DetailTab datas={datas} nickname={datas.nickname} />
    </>
  );
});

export default StoryDetail;
