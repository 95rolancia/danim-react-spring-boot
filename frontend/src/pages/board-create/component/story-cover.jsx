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
  ImageList,
  ImageListItem,
  InputAdornment,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import CoverImageChange from './cover-image-change';
import { toJS } from 'mobx';

const StoryCover = observer((props) => {
  const boardCreate = useBoardCreate();
  const [isShowSetting, setIsShowSetting] = useState(false);
  const startDay = toJS(
    boardCreate.calculatePrettyDate(boardCreate.tripDate[0]),
  );
  const endDay = toJS(
    boardCreate.calculatePrettyDate(
      boardCreate.tripDate[boardCreate.tripDate.length - 1],
    ),
  );

  // useEffect(() => {
  //   boardCreate.setThumbnail();
  // }, []);

  const coverImgUrl =
    boardCreate.imgBaseURL + boardCreate.nickname + '/' + boardCreate.thumbnail;

  const photoURL = boardCreate.imgBaseURL + boardCreate.nickname + '/';

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
      height: '100%',
      width: '100%',
    },
    titleBox: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      color: 'white',
      textAlign: 'center',
      marginBottom: '7.5em',
    },
    tripDate: {
      marginTop: '0.5em',
      color: 'gray',
    },
    inputTextColor: {
      color: 'white',
      fontSize: '1.7rem',
    },
    buttonBox: {
      marginBottom: '3em',
    },
    imageList: {
      flexWrap: 'nowrap',
      // zIndex: '10',
      // // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    underline: {
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: '5px solid white',
      },
      '& .MuiInput-underline:after': {
        borderBottom: '5px solid #EC9361',
      },
      '& .MuiInput-underline:before': {
        borderBottom: '5px solid #4F9EE8',
      },
    },
  }));
  const classes = useStyles();

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    boardCreate.handleTitleChange(newTitle);
  };

  const showSetting = () => {
    setIsShowSetting(true);
  };

  const hideSetting = () => {
    setIsShowSetting(false);
  };

  const changeThumbnail = (e) => {
    boardCreate.changeThumbnail(e.target.alt);
  };

  return (
    <>
      {/* <CoverImageChange
        isShowSetting={isShowSetting}
        hideSetting={hideSetting}
      /> */}
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignContent="center"
          className={classes.storyCoverBox}
          mt={6}
          mb={0.5}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
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
                color="primary"
                inputProps={{ style: { textAlign: 'center' } }}
                InputProps={{
                  className: classes.inputTextColor,
                  startAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleTitleChange}
                className={(classes.titleField, classes.underline)}
              ></TextField>
            </form>
            <Typography className={classes.tripDate}>
              {startDay[0]}.{startDay[1]}.{startDay[2]} - {endDay[0]}.
              {endDay[1]}.{endDay[2]}
            </Typography>
          </Box>
        </Box>
        <Box pb={3}>
          <ImageList className={classes.imageList} cols={4.3} gap={4}>
            {boardCreate.photos.map((item) => (
              <ImageListItem
                key={item.filename}
                className={classes.imageListItem}
                cols={1}
                rows={0.6}
              >
                <img
                  src={photoURL + item.filename}
                  alt={item.filename}
                  onClick={changeThumbnail}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Grid>
    </>
  );
});

export default StoryCover;
