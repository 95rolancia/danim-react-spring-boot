import React, { useState } from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {
  makeStyles,
  Typography,
  Grid,
  Box,
  TextField,
  Fab,
} from '@material-ui/core';
import CoverImageChange from './cover-image-change';

const StoryCover = observer((props) => {
  const boardCreate = useBoardCreate();
  const [isShowSetting, setIsShowSetting] = useState(false);

  // useEffect(() => {
  //   boardCreate.setThumbnail();
  // }, []);

  const coverImgUrl =
    boardCreate.imgBaseURL + boardCreate.nickname + '/' + boardCreate.thumbnail;

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
      height: '100% ',
      width: '100%',
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

  const showSetting = () => {
    setIsShowSetting(true);
  };

  const hideSetting = () => {
    setIsShowSetting(false);
  };

  return (
    <>
      <CoverImageChange
        isShowSetting={isShowSetting}
        hideSetting={hideSetting}
      />
      <Grid item xs={12}>
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
            <Fab onClick={showSetting}>
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
      </Grid>
    </>
  );
});

export default StoryCover;
