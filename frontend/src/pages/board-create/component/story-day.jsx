import { makeStyles } from '@material-ui/styles';
import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import { StoryByAdress } from './index';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  photoBox: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
}));

const StoryDay = observer(({ date, photos }) => {
  const boardCreate = useBoardCreate();
  const classes = useStyles();

  const [address2compare, setAddress2compare] = useState([]);

  const tripDateIdx = boardCreate.calculateDayNum(date);
  const prettyDate = boardCreate.calculatePrettyDate(date);

  useEffect(() => {
    setAddress2compare([]);
    const temp = photos;
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
  }, []);

  // const calculateDayNum = (date) => {
  //   const idx = boardCreate.calculateDayNum(date);
  //   return idx;
  // };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="row"
        sx={{ flexWrap: 'nowrap' }}
        py={2}
      >
        <Box pr={1.5}>
          <Typography variant="h5">여행 {tripDateIdx}날</Typography>
        </Box>
        <Box>
          <Typography variant="h5">
            ({prettyDate[0]}.{prettyDate[1]}.{prettyDate[2]})
          </Typography>
        </Box>
      </Box>
      <Box>
        {address2compare.map((address) => (
          <StoryByAdress
            key={uuid()}
            photos={photos.filter((photo) => photo.address === address)}
            address={address}
          />
        ))}
      </Box>
    </Box>
  );
});

export default StoryDay;
