import React from 'react';
import { makeStyles, Typography, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '7em',
  },
}));

const StoryCover = ({ title }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h5" component="h5">
            {title} 표지
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth>수정</Button>
        </Grid>

        <Grid item xs={4}>
          <img className={classes.image} src="/images/danilogo.png" alt="" />
        </Grid>
        <Grid item xs={8} container>
          <Grid item xs={12}>
            <div className="duration">날짜 자동으로 계산해서 들어오게</div>
          </Grid>
          <Grid item xs={12}>
            <div className="storyTag">태그 흠 선택탭 추가를 고민하기</div>
          </Grid>
        </Grid>
        <Grid item>
          <Typography>
            표지 메모 더보기도 구현하세요 이거보다 예쁜 레이아웃이 있을 것
            같은디...
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default StoryCover;
