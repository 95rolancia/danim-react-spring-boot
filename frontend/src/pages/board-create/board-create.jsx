import React, { useState } from 'react';
import { Img } from './index';
import uuid from 'react-uuid';
import { makeStyles, Container, Button, Grid } from '@material-ui/core';
import loadImage from 'blueimp-load-image';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imgBox: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: '30px',
  },
}));

const BoardCreate = () => {
  const classes = useStyles();

  const [imgs, setImgs] = useState([]);

  const handleImagesSubmit = (e) => {
    e.preventDefault();
    console.log('imgs', imgs);
  };

  const handleClick = (img) => {
    console.log('you clicked!', img);
  };

  const getMetaData = async (imgFile) => {
    console.log('getMetaData 실행');

    const result = await loadImage.parseMetaData(imgFile, {
      maxMetaDataSize: 262144,
    });

    if (result.exif.get('GPSInfo') !== undefined) {
      console.log('date: ', result.exif.get('Exif').get('DateTimeDigitized'));
      console.log('gps info: ', result.exif.get('GPSInfo').getAll());
      return {
        dateTimeDigitized: result.exif.get('Exif').get('DateTimeDigitized'),
        gpsInfo: result.exif.get('GPSInfo').getAll(),
      };
    } else {
      return false;
    }
  };

  const handleFileChange = async (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]); // 파일을 읽어 버퍼에 저장
        // onload 콜백함수는 비동기로 실행되므로 콜백함수 안에서 html요소를 생성하거나 appendChild하면 안됨
        reader.onloadend = async () => {
          const saveURL = reader.result;
          if (saveURL) {
            let saveURLSub = saveURL.toString();
            let imgObj = {};
            let exifData = await getMetaData(e.target.files[i]);
            console.log('exif 데이터 있나요', exifData);
            if (exifData.gpsInfo !== undefined) {
              console.log('exif 데이터 언디파인드 아님!');
              imgObj['isExifData'] = true;
              imgObj['dateTimeDigitized'] = exifData.dateTimeDigitized;
              imgObj['gpsInfo'] = exifData.gpsInfo;
            } else {
              console.log('exif 데이터 언디파인드임!');
              imgObj['isExifData'] = false;
              imgObj['dateTimeDigitized'] = null;
              imgObj['gpsInfo'] = null;
            }
            imgObj['imgFile'] = e.target.files[i];
            imgObj['key'] = uuid();
            imgObj['imgPreviewURL'] = saveURLSub;
            setImgs((imgs) => [...imgs, imgObj]);
          }
        };
      }
    }
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <form>
        <div className={classes.imgBox}>
          {imgs.map((img) => (
            <Img key={img.key} img={img} onClick={handleClick} />
          ))}
        </div>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              <label htmlFor="input-file">
                <input
                  type="file"
                  id="input-file"
                  accept={'image/*'}
                  onChange={handleFileChange}
                  multiple
                  style={{ display: 'none' }}
                />
                사진추가
              </label>
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleImagesSubmit}
            >
              사진 등록하기
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BoardCreate;
