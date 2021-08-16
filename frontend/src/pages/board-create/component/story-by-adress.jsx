import React, { useState, useEffect } from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/styles';
import { StoryThumbnail, BoardPlaceMemo } from './index';
import { Button, Fab, Box, Typography, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
}));

const StoryByAdress = observer(({ photos, address }) => {
  const boardCreate = useBoardCreate();
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
    boardCreate.uploadMemo(newMemo, address);
  };

  // const saveAddressMemoAtPhoto = (photo) => {

  // }

  return (
    <>
      {isPhoto && (
        <>
          <Box display="flex" flexDirection="column">
            <BoardPlaceMemo
              address={address}
              isShowSetting={isShowSetting}
              hideSetting={hideSetting}
              onMemoChange={handleMemoChange}
              photos={photos}
              boardCreate={boardCreate}
            />

            <div>{address}</div>
            {/* <Fab onClick={showSetting}>
              <CreateIcon />
            </Fab> */}
            <Box>
              {photos.map((photo) => (
                <StoryThumbnail key={photo.filename} photo={photo} />
              ))}
            </Box>
            <Box>
              <form>
                <TextField
                  defaultValue={photos[0].content}
                  fullWidth
                  multiline
                  onChange={handleMemoChange}
                ></TextField>
              </form>
            </Box>
            {/* <Box display="flex">
              <Box>{photos[0].content}</Box>
            </Box> */}
          </Box>
        </>
      )}
    </>
  );
});

export default StoryByAdress;
