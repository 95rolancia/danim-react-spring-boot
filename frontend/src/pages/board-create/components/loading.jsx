import React from 'react';
import { observer } from 'mobx-react-lite';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  photoLoading: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    width: '6em',
    height: '4em',
    marginBottom: '3em',
  },
  photoLoadingTitle: {
    fontFamily: 'MingukBold',
    color: '#36434C',
    paddingBottom: theme.spacing(2),
  },
}));

const Loading = observer(() => {
  const classes = useStyles();
  const boardCreate = useBoardCreate();
  if (
    boardCreate.photos.length === 0 &&
    boardCreate.successImgNum === 0 &&
    boardCreate.errorImgNum >= boardCreate.totalImgNum
  ) {
    boardCreate.changePage2TitleCreate();
    alert('GPS 정보가 있는 사진이 없습니다.');
  } else if (
    boardCreate.successImgNum + boardCreate.errorImgNum ===
    boardCreate.totalImgNum
  ) {
    setTimeout(() => {
      boardCreate.changeLoading2MemoWrite();
    }, 500);
  }

  return (
    <section className={classes.photoLoading}>
      <img className={classes.logo} alt="logo" src="/images/danilogo.png" />
      <Typography
        variant="h5"
        component="h5"
        className={classes.photoLoadingTitle}
      >
        {boardCreate.totalImgNum}개의 사진중 {boardCreate.successImgNum}개를
        로딩했습니다.
      </Typography>
      <Typography
        variant="h6"
        component="h6"
        className={classes.photoLoadingTitle}
      >
        {boardCreate.errorImgNum}개의 사진은 <br></br>GPS 정보를 불러오는데
        실패했습니다.
      </Typography>
    </section>
  );
});

export default Loading;
