import React, { useState, useEffect, useRef } from 'react';
import { toJS } from 'mobx';
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
  Menu,
  MenuItem,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  imageList: {
    flexWrap: 'nowrap',
    // zIndex: '10',
    // // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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
  tagButton: {
    color: 'white',
    overflow: 'visible',
    fontSize: '1em',
    textDecoration: 'underline',
  },
}));

const StoryByAdress = observer(({ photos, address }) => {
  const imgRef = useRef();
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const [isPhoto, setIsPhoto] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const photoURL = boardCreate.imgBaseURL + boardCreate.nickname + '/';

  useEffect(() => {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].address === address) {
        setIsPhoto(true);
      }
    }
  }, [photos, address]);

  const handleMemoChange = (e) => {
    const newMemo = e.target.value;
    boardCreate.uploadMemo(newMemo, address);
  };

  const handleClickTag = (str, photo) => {
    boardCreate.changeTag(str, photo);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePhoto = (photo) => {
    boardCreate.deletePhoto(photo);
  };

  return (
    <>
      {isPhoto && (
        <>
          <Box display="flex" flexDirection="column">
            <div>{address}</div>
            {/* <Fab onClick={showSetting}>
              <CreateIcon />
            </Fab> */}
            <Box>
              <ImageList
                // sx={{ width: 500, height: 450 }}
                cols={2.7}
                className={classes.imageList}
                // rowHeight={164}
              >
                {/* <ImageListItem key="Subheader" cols={3}>
                  <ListSubheader component="div">December</ListSubheader>
                </ImageListItem> */}
                {photos.map((photo) => (
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
                          <IconButton
                            id={`tag-button-${photo.filename}`}
                            aria-controls={`tag-menu-${photo.filename}`}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            className={classes.tagButton}
                            onClick={handleClick}
                            // onClick={() => handleTagClick(photo)}
                          >
                            # {photo.tag}
                            {/* <Chip
                            // icon={<LocalOfferIcon />}
                            label={`# ${photo.tag}`}
                            variant="outlined"
                            className={classes.tagChip}
                          /> */}
                          </IconButton>
                          <Menu
                            id={`tag-menu-${photo.filename}`}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}
                          >
                            <MenuItem
                              onClick={() => handleClickTag('NONE', photo)}
                            >
                              NONE
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleClickTag('PERSON', photo)}
                            >
                              PERSON
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleClickTag('SENERY', photo)}
                            >
                              SENERY
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleClickTag('FOOD', photo)}
                            >
                              FOOD
                            </MenuItem>
                          </Menu>
                        </>
                      }
                      className={classes.tagBackground}
                    />
                    <ImageListItemBar
                      position="top"
                      actionIcon={
                        <IconButton onClick={() => deletePhoto(photo)}>
                          <CloseIcon className={classes.deleteIcon} />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={classes.deleteIconBackground}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
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
