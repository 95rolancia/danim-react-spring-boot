import React from 'react';
import { observer } from 'mobx-react-lite';
import useStory from '../../hooks/useStory';
import {
  DetailHeader,
  BoardDetailMap,
  DetailTab,
  ReplyList,
  LoveList,
  ReplyField,
} from './components';
import { Divider, Box } from '@material-ui/core';

const StoryDetail = observer(
  ({ datas, no, handleLike, handleDelete, comments, handleComment }) => {
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
        <ReplyList datas={comments} no={no} handleComment={handleComment} />
        <Divider />
        <ReplyField no={no} handleComment={handleComment} />
        <Box component="span" m={3} />
      </>
    );
  },
);

export default StoryDetail;
