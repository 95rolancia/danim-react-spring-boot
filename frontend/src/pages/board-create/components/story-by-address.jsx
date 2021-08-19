import React, { useState, useEffect, useRef } from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import {
  makeStyles,
  Box,
  ImageList,
  ImageListItem,
  TextField,
  ImageListItemBar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close, Room } from '@material-ui/icons';
import TagMenu from './tag-menu';

const useStyles = makeStyles((theme) => ({
  imageList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  deleteIcon: {
    color: 'white',
  },
  deleteIconBackground: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  tagBackground: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const StoryByAdress = observer(({ photos, address }) => {
  const imgRef = useRef();
  const inputRef = useRef();
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const [isPhoto, setIsPhoto] = useState(false);

  const photoURL = boardCreate.imgBaseURL + boardCreate.nickname + '/';

  useEffect(() => {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].address === address) {
        setIsPhoto(true);
      }
    }
  }, []);

  const handleMemoWrite = () => {
    boardCreate.uploadMemo(inputRef.current.value, address);
  };

  const deletePhoto = (photo) => {
    boardCreate.deletePhoto(photo);
  };

  return (
    <>
      {isPhoto && (
        <Box display="flex" flexDirection="column" mb={1}>
          <Box mb={1}>
            <ImageList cols={3.1} className={classes.imageList}>
              {photos.map((photo) => {
                // console.log('포토토토토', photo);
                return (
                  <ImageListItem key={photo.filename}>
                    <img
                      src={photoURL + photo.filename}
                      alt={photo.adress}
                      loading="lazy"
                      ref={imgRef}
                    />
                    <ImageListItemBar
                      actionPosition="left"
                      actionIcon={
                        <>
                          <TagMenu photo={photo} />
                        </>
                      }
                      className={classes.tagBackground}
                    />
                    <ImageListItemBar
                      position="top"
                      actionIcon={
                        <IconButton onClick={() => deletePhoto(photo)}>
                          <Close className={classes.deleteIcon} />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={classes.deleteIconBackground}
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Box>

          <Box display="flex" flexDirection="row" py={1}>
            <Room color="primary" />
            <Box pl={1}>
              <Typography>
                {boardCreate.calculatePrettyAddress(address)}
              </Typography>
            </Box>
          </Box>

          <Box mb={3}>
            <TextField
              defaultValue={photos[0].content}
              label="Memo"
              variant="outlined"
              fullWidth
              multiline
              onBlur={handleMemoWrite}
              inputRef={inputRef}
            ></TextField>
          </Box>
        </Box>
      )}
    </>
  );
});

export default StoryByAdress;
