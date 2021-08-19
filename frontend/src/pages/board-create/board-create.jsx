import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useUser from '../../hooks/useUser';
import useBoardCreate from '../../hooks/useBoardCreate';
import loadImage from 'blueimp-load-image';
import Compressor from 'compressorjs';
import { TitleCreate, Loading, MemoWrite } from './components';
import { HeaderMain, HeaderBoardCreateMemo } from '../../components';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const BoardCreate = observer(() => {
  const classes = useStyles();
  const user = useUser();
  const boardCreate = useBoardCreate();

  boardCreate.setNickname(toJS(user.user).nickname);
  if (boardCreate.title === '') {
    boardCreate.setDefaultTitle();
  }

  const getMetaData = async (imgFile) => {
    try {
      const result = await loadImage.parseMetaData(imgFile, {
        maxMetaDataSize: 500000,
      });

      try {
        if (result.exif.get('GPSInfo') !== undefined) {
          const gpsInfo = result.exif.get('GPSInfo').getAll();
          const latArr = gpsInfo.GPSLatitude.split(',');
          const lat =
            parseFloat(latArr[0]) +
            parseFloat(latArr[1] / 60) +
            parseFloat(latArr[2] / 3600);
          const lngArr = gpsInfo.GPSLongitude.split(',');
          const lng =
            parseFloat(lngArr[0]) +
            parseFloat(lngArr[1] / 60) +
            parseFloat(lngArr[2] / 3600);

          return {
            dateTimeDigitized: result.exif.get('Exif').get('DateTimeDigitized'),
            latitude: lat,
            longtitude: lng,
          };
        } else {
          return false;
        }
      } catch {
        return false;
      }
    } catch {}
  };

  const handleFileChange = async (e) => {
    boardCreate.resetImgErrSuccessNum();
    boardCreate.setTotalImgNum(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        const exifData = await getMetaData(e.target.files[i]);
        if (!exifData) {
          boardCreate.uploadImgErrNum();
        } else {
          new Compressor(e.target.files[i], {
            quality: 0.9,
            success(result) {
              const formData = new FormData();
              formData.append('file', result);
              formData.append('date', exifData.dateTimeDigitized);
              formData.append('latitude', exifData.latitude);
              formData.append('longtitude', exifData.longtitude);
              handleStoryPhotoSubmit(formData);
            },
          });
        }
      }
    }
  };

  const handleStoryPhotoSubmit = (obj) => {
    boardCreate
      .setStoryPhoto(obj)
      .then((res) => {
        if (res) {
          boardCreate.uploadImgSuccessNum();
          boardCreate.sortTripDate(res.data.date);
          boardCreate.sortTripAddress(res.data.address);

          let obj = {
            address: res.data.address,
            content: null,
            date: res.data.date,
            filename: res.data.filename,
            latitude: res.data.latitude,
            longtitude: res.data.longtitude,
            placeName: res.data.placeName,
            tag: 'NONE',
          };
          boardCreate.addPhoto(obj);
        } else {
          alert('스토리작성에 문제가 발생했습니다');
        }
      })
      .catch((err) => {
        boardCreate.uploadImgErrNum();
      });
  };

  const location = useLocation();
  useEffect(() => {
    if (location.state != null) {
      boardCreate.getTemporarilySavedStory(location.state.storyNo);
    } else {
      boardCreate.reset();
    }
  }, [boardCreate, location.state]);

  if (boardCreate.isLoading) {
    return <Loading />;
  }

  if (!boardCreate.isFirstPage) {
    return (
      <>
        <HeaderBoardCreateMemo
          title="여행일기 작성"
          onFileChange={handleFileChange}
        />
        <Container container className={classes.root}>
          <MemoWrite onFileChange={handleFileChange} />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <HeaderMain />
        <Container maxWidth="xs" className={classes.root}>
          <TitleCreate onFileChange={handleFileChange} />
        </Container>
      </>
    );
  }
});

export default BoardCreate;
