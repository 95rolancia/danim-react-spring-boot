import { makeStyles } from '@material-ui/styles';
import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import { StoryThumbnail, StoryByAdress } from './index';

// const useStyles = makeStyles((theme) => ({
//   photoBox: {
//     marginTop: theme.spacing(1.5),
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start',
//   },
// }));

const StoryDay = observer(({ photos, date }) => {
  const boardCreate = useBoardCreate();
  // const classes = useStyles();

  const [address2compare, setAddress2compare] = useState([]);

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

  return (
    <>
      <h1>{date}</h1>
      <div>
        {address2compare.map((address) => (
          <StoryByAdress
            key={uuid()}
            photos={photos.filter((photo) => photo.address === address)}
            address={address}
          />
        ))}
      </div>
    </>
  );
});

export default StoryDay;
