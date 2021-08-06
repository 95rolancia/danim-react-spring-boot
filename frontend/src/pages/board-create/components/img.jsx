import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  thumbnail: {
    height: '30vw',
    width: '30vw',
    paddingBottom: '2vh',
    objectFit: 'cover',
  },
}));

const Img = ({ img, onClick }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick(img);
  };

  return (
    <div className={classes.root}>
      <img
        src={img.imgPreviewURL}
        alt={img.imgFile.name}
        className={classes.thumbnail}
        onClick={handleClick}
      />
      <div>
        {img.isExifData ? (
          <div>
            date: {img.dateTimeDigitized}
            <br></br>
            Altitude: {img.gpsInfo.GPSAltitude}
            <br></br>
            latitude: {img.gpsInfo.GPSLatitude}
            <br></br>
            longitude: {img.gpsInfo.GPSLongitude}
            <br></br>
          </div>
        ) : (
          <div>gps정보 없어요</div>
        )}
      </div>
    </div>
  );
};

export default Img;
