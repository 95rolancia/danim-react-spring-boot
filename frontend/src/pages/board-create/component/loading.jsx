import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { PhotoSizeSelectSmallTwoTone } from '@material-ui/icons';

const Loading = observer((props) => {
  const boardCreate = useBoardCreate();
  if (
    boardCreate.photos.length === 0 &&
    toJS(boardCreate.successImgNum) === 0 &&
    toJS(boardCreate.errorImgNum) >= toJS(boardCreate.totalImgNum)
  ) {
    boardCreate.changePage2TitleCreate();
  }
  if (
    toJS(boardCreate.successImgNum) + toJS(boardCreate.errorImgNum) ===
    toJS(boardCreate.totalImgNum)
  ) {
    setTimeout(() => {
      boardCreate.changeLoading2MemoWrite();
    }, 500);
  }

  return (
    <>
      <h1>{boardCreate.title}의 사진을 로딩 중입니다.</h1>
      <div>토탈 : {toJS(boardCreate.totalImgNum)}</div>
      <div>성공 : {toJS(boardCreate.successImgNum)}</div>
      <div>실패 : {toJS(boardCreate.errorImgNum)}</div>
      <div>옠</div>
    </>
  );
});

export default Loading;
