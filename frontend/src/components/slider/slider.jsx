import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardSlide from './card-slide';
import 'swiper/swiper.scss';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  slide: {
    maxHeight: '50vh',
    height: '90%',
  },
  slides: {
    height: '21em',
  },
  media: {
    height: '16em',
  },
}));

const Slider = ({ datas }) => {
  const classes = useStyles();

  return (
    <Swiper
      className={classes.slides}
      spaceBetween={10}
      slidesPerView={2}
      onClick={(swiper) => console.log(datas[swiper.clickedIndex])}
    >
      {datas.map((data) => (
        <SwiperSlide key={data.no}>
          <Card className={classes.slide}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={data.thumbnail}
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
  );
};

export default Slider;
