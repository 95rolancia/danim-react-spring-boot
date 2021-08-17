import React from 'react';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import CardSlide from './card-slide';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  slide: {
    maxHeight: '50vh',
    height: '90%',
  },
  slides: {
    height: '23em',
  },
  media: {
    height: '16em',
  },
  empty: {
    height: '5em',
    textAlign: 'center',
  },
}));

const Slider = ({ datas }) => {
  const classes = useStyles();
  const history = useHistory();

  const readStory = (storyNo) => {
    history.push('/read/' + storyNo);
  };
  return (
    <>
      {!datas.length ? (
        <div className={classes.empty}>
          <Typography>해당 지역에는 아직 스토리가 없습니다.</Typography>
        </div>
      ) : (
        <Swiper
          className={classes.slides}
          spaceBetween={10}
          slidesPerView={2}
          onClick={(swiper) => readStory(datas[swiper.clickedIndex].storyNo)}
        >
          {datas.map((data, index) => (
            <SwiperSlide key={index}>
              <Card className={classes.slide}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={
                      process.env.REACT_APP_IMAGE_BASE_URL +
                      data.nickname +
                      '/' +
                      data.thumbnail
                    }
                    title="게시글 사진"
                  />
                  <CardContent>
                    <CardSlide data={data} />
                  </CardContent>
                </CardActionArea>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;
