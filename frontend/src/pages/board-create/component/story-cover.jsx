import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {
  makeStyles,
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  Fab,
} from '@material-ui/core';
import { useEffect } from 'react';

const StoryCover = observer((props) => {
  const boardCreate = useBoardCreate();

  const coverImgUrl =
    boardCreate.imgBaseURL +
    boardCreate.nickname +
    '/' +
    boardCreate.photos[0].filename;

  const useStyles = makeStyles((theme) => ({
    storyCover: {
      height: '90vw',
      width: '90vw',
      paddingBottom: '2vh',
      objectFit: 'cover',
    },
    storyCoverBox: {
      backgroundImage: `url(${coverImgUrl})`,
      backgroundSize: 'cover',
      height: '90vw',
      width: '90vw',
    },
    titleBox: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: 'white',
      textAlign: 'center',
    },
    tripDateTypo: {
      marginTop: '0.5em',
      color: 'gray',
    },
    inputTextColor: {
      color: 'white',
      fontSize: '1.7rem',
    },
    buttonBox: {
      marginBottom: '2.4em',
    },
  }));
  const classes = useStyles();

  const handleTitleChange = (e) => {
    boardCreate.handleTitleChange(e.target.value);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignContent="center"
        className={classes.storyCoverBox}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          p={1}
          className={classes.buttonBox}
        >
          <Fab>
            <PhotoLibraryIcon />
          </Fab>
        </Box>
        <Box p={3} className={classes.titleBox}>
          <form>
            <TextField
              defaultValue={boardCreate.title}
              fullWidth
              inputProps={{ style: { textAlign: 'center' } }}
              InputProps={{ className: classes.inputTextColor }}
              onChange={handleTitleChange}
            ></TextField>
          </form>
          <Typography className={classes.tripDateTypo}>
            {boardCreate.tripDate[0]} -{' '}
            {boardCreate.tripDate[boardCreate.tripDate.length - 1]}
          </Typography>
        </Box>
      </Box>
    </>
  );
});

export default StoryCover;
