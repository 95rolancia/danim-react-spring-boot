import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  makeStyles,
  Container,
  Button,
  Typography,
  TextField,
} from '@material-ui/core';
import loadImage from 'blueimp-load-image';
import HeaderGoBack from '../../components/header/header-go-back';
import useUser from '../../hooks/useUser';
import { toJS } from 'mobx';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleBox: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  titleInput: {
    marginTop: theme.spacing(2),
  },
  imgBox: {
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  button: {
    bottom: theme.spacing(0),
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    borderRadius: '30px',
  },
}));

const BoardCreate = () => {
  const classes = useStyles();
  const history = useHistory();
  // const user = useUser();

  const getDate = (source, delimiter = '-') => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  };

  const defaultTitle = getDate();
  const [title, setTitle] = useState(defaultTitle);
  const [img, setImg] = useState({});
  const [imgErr, setImgErr] = useState(0);

  // useEffect(() => {
  //   user.getUser().then((res) => {
  //     if (!res) {
  //       alert('사용자 정보 조회 실패!');
  //       return;
  //     }
  //     // if (임시저장 파일) { history.push('글작성페이지')}
  //     console.log('getUser 성공', res);
  //   });
  // });

  // useEffect(
  //   (user) => {
  //     if (Object.keys(img).length !== 0) {
  //       console.log('img에 변화를 감지함 서버에 지금 img 넘겨줄거임', img);
  //       // user
  //       //   .setStoryPhoto(img)
  //       //   .then((res) => {
  //       //     if (res) {
  //       //       return console.log(res);
  //       //     } else {
  //       //       alert('스토리 작성에 문제가 발생했습니다');
  //       //     }
  //       //   })
  //       //   .catch((err) => {
  //       //     console.log(err);
  //       //   });
  //     }
  //   },
  //   [img],
  // );

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleFileChange = async (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        console.log('파일체인지 작동!');
        const exifData = await getMetaData(e.target.files[i]);
        if (!exifData) {
          setImgErr(imgErr + 1);
          console.log(e.target.files[i], 'gps 데이터 없는 파일');
          return;
        }

        // const userData = toJS(user.user).userno;
        // imgObj['userId'] = userData;
        let imgObj = {
          file: e.target.files[i],
          // userId: userData,
          date: exifData.dateTimeDigitized,
          latitude: exifData.latitude,
          longtitude: exifData.longtitude,
        };

        console.log('현재 imgObj', imgObj);
        setImg(imgObj);
        console.log('파일체인지 완료!');
      }
    }
    return;
  };

  const getMetaData = async (imgFile) => {
    console.log('getMetaData 작동!');
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

        console.log('get meta data 완료');
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

  const watchimgs = () => {
    console.log(img);
    console.log(imgErr);
  };

  return (
    <>
      <HeaderGoBack />
      <Container maxWidth="xs" className={classes.root}>
        <form>
          <div className={classes.titleBox}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.greeting}
            >
              안녕하세요 User님! <br></br>
              새로운 여행의 제목을 알려주세요.
            </Typography>
            <TextField
              id="tripTitle"
              placeholder={defaultTitle}
              fullWidth
              autoFocus
              className={classes.titleInput}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <input
              type="file"
              id="input-file"
              accept={'.jpg, .png'}
              onChange={handleFileChange}
              multiple
              style={{ display: 'none' }}
            />
            <label htmlFor="input-file">
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                component="span"
                className={classes.button}
              >
                사진추가
              </Button>
            </label>
          </div>
        </form>
        <button onClick={watchimgs}>imgs err를 보자</button>
      </Container>
    </>
  );
};

export default BoardCreate;
