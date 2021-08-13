import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import { StoryThumbnail, StoryByAdress } from './index';

const useStyles = makeStyles((theme) => ({
  photoBox: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
}));

const StoryDay = ({ imgBaseURL, photos, nickname, date, tripAddress }) => {
  const classes = useStyles();

  const [address2compare, setAddress2compare] = useState([]);

  useEffect(() => {
    setAddress2compare([]);
    const temp = photos.sort(sortPhotosBydate);
    console.log(temp);
    for (let i = 0; i < temp.length; i++) {
      if (i === 0) {
        setAddress2compare((address2compare) => [
          ...address2compare,
          temp[0].address,
        ]);
      } else if (temp[i].address !== temp[i - 1].address) {
        setAddress2compare((address2compare) => [
          ...address2compare,
          temp[i].address,
        ]);
      }
    }
  }, [photos]);

  const sortPhotosBydate = (photoA, photoB) => {
    let dateA = photoA.date;
    let dateB = photoB.date;
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  };

  const watchPhoto = () => {
    console.log(photos);
    console.log(address2compare);
  };

  return (
    <>
      <h1>{date}</h1>
      <button onClick={watchPhoto}>아 포토머임</button>

      <div>
        {address2compare.map((address) => (
          <StoryByAdress
            key={uuid()}
            photos={photos.filter((photo) => photo.address === address)}
            nickname={nickname}
            imgBaseURL={imgBaseURL}
            address={address}
          />
        ))}
      </div>
    </>
  );
};

export default StoryDay;
