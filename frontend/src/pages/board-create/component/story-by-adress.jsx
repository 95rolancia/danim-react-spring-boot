import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { StoryThumbnail, BoardPlaceMemo } from './index';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
}));

const StoryByAdress = ({ photos, boardCreate, address }) => {
  const classes = useStyles();
  const [isPhoto, setIsPhoto] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);

  useEffect(() => {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].address === address) {
        setIsPhoto(true);
      }
    }
  }, [photos, address]);

  const showSetting = () => {
    setIsShowSetting(true);
  };

  const hideSetting = () => {
    setIsShowSetting(false);
  };

  const handleMemoChange = (e) => {
    const newMemo = e.target.value;
    console.log('뉴메모?', newMemo);
    boardCreate.uploadMemo(newMemo, address);
  };

  // const saveAddressMemoAtPhoto = (photo) => {

  // }

  return (
    <>
      {isPhoto && (
        <>
          <BoardPlaceMemo
            address={address}
            isShowSetting={isShowSetting}
            hideSetting={hideSetting}
            onMemoChange={handleMemoChange}
            photos={photos}
            boardCreate={boardCreate}
          />

          <div>{address}</div>
          <Button onClick={showSetting} className={classes.button}>
            메모
          </Button>
          <div>
            {photos.map((photo) => (
              <StoryThumbnail
                key={photo.filename}
                photo={photo}
                boardCreate={boardCreate}
              />
            ))}
          </div>
          <div>메모 : {photos[0].content}</div>
        </>
      )}
    </>
  );
};

export default StoryByAdress;
