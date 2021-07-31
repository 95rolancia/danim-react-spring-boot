import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardSlide from './card-slide';
import 'swiper/swiper.scss';

const useStyles = makeStyles((theme) => ({
  slide: {
    backgroundColor: 'skyblue',
  },
  slides: {
    height: '10em',
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
        <SwiperSlide className={classes.slide} key={data.no}>
          <CardSlide data={data} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
