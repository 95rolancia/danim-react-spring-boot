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
}));

const Slider = ({ datas }) => {
  const classes = useStyles();
  const history = useHistory();

  const readStory = (storyNo) => {
    history.push('/read/' + storyNo);
  };
  return (
    <Swiper
      className={classes.slides}
      spaceBetween={10}
      slidesPerView={2}
      onClick={(swiper) => readStory(datas[swiper.clickedIndex].storyNum)}
    >
      {datas.map((data) => (
        <SwiperSlide key={data.storyNum}>
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
