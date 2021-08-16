import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { makeStyles, Container } from '@material-ui/core';
import loadImage from 'blueimp-load-image';
import HeaderGoBack from '../../components/header/header-go-back';
import useUser from '../../hooks/useUser';
import useBoardCreate from '../../hooks/useBoardCreate';
import Compressor from 'compressorjs';
import { TitleCreate, Loading, MemoWrite } from './component/index';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const BoardCreate = observer(() => {
  const classes = useStyles();
  const user = useUser();
  const boardCreate = useBoardCreate();

  useEffect(() => {
    boardCreate.setNickname(toJS(user.user).nickname);
    boardCreate.setDefaultTitle();
  }, []);

  const getMetaData = async (imgFile) => {
    const result = await loadImage.parseMetaData(imgFile, {
      maxMetaDataSize: 262144,
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
        console.log('get meta data 완료', result);
        return {
          dateTimeDigitized: result.exif.get('Exif').get('DateTimeDigitized'),
          latitude: lat,
          longtitude: lng,
        };
      } else {
        console.log('getMetaData 실패ㅠㅠ gps 인포 언디파인드');
        return false;
      }
    } catch {
      console.log('getMetaData 실패ㅠㅠ 언디파인드는 아닌데...');
      return false;
    }
  };

  const handleFileChange = async (e) => {
    boardCreate.resetImgErrSuccess();
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        const exifData = await getMetaData(e.target.files[i]);
        if (!exifData) {
          boardCreate.uploadImgErr();
          console.log(e.target.files[i], 'gps 데이터 없는 파일');
          return;
        }
        new Compressor(e.target.files[i], {
          quality: 0.8,
          success(result) {
            const formData = new FormData();
            formData.append('file', result);
            formData.append('date', exifData.dateTimeDigitized);
            formData.append('latitude', exifData.latitude);
            formData.append('longtitude', exifData.longtitude);
            console.log(formData);
            handleStoryPhotoSubmit(formData);
          },
        });
      }
    }
  };

  const handleStoryPhotoSubmit = (obj) => {
    console.log(obj);
    boardCreate
      .setStoryPhoto(obj)
      .then((res) => {
        if (res) {
          console.log(res);
          boardCreate.uploadImgSuccess();
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
            tag: null,
          };
          boardCreate.addPhoto(obj);

          console.log(boardCreate.photos);
        } else {
          alert('스토리작성에 문제가 발생했습니다');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <HeaderGoBack title="여행일기 작성" />
      <Container maxWidth="xs" className={classes.root}>
        {boardCreate.isFirstPage && (
          <TitleCreate
            boardCreate={boardCreate}
            onFileChange={handleFileChange}
          />
        )}
        {boardCreate.isLoading && <Loading />}
        {!boardCreate.loading && !boardCreate.isFirstPage && (
          <MemoWrite boardCreate={boardCreate} />
        )}
      </Container>
    </>
  );
});

export default BoardCreate;
