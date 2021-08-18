import React, { useState } from 'react';
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
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';

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

const TagMenu = observer(({ photo }) => {
  const classes = useStyles();
  const boardCreate = useBoardCreate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickTag = (str, photo) => {
    boardCreate.changeTag(str, photo);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id={`tag-button-${photo.filename}`}
        aria-controls={`tag-menu-${photo.filename}`}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        className={classes.tagButton}
        onClick={handleClick}
      >
        #{photo.tag}
      </IconButton>
      <Menu
        id={`tag-menu-${photo.filename}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            console.log('none', photo);
            handleClickTag('NONE', photo);
          }}
        >
          NONE
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log('person', photo);
            handleClickTag('PERSON', photo);
          }}
        >
          PERSON
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log('scene', photo);
            handleClickTag('SCENERY', photo);
          }}
        >
          SCENERY
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log('food', photo);
            handleClickTag('FOOD', photo);
          }}
        >
          FOOD
        </MenuItem>
      </Menu>
    </>
  );
});

export default TagMenu;
