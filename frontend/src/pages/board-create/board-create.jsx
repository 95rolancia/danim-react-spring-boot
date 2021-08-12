import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { makeStyles, Container } from '@material-ui/core';
import loadImage from 'blueimp-load-image';
import HeaderGoBack from '../../components/header/header-go-back';
import useUser from '../../hooks/useUser';
import Compressor from 'compressorjs';
import { TitleCreate, Loading, MemoWrite } from './component/index';
import { observer } from 'mobx-react-lite';
import uuid from 'react-uuid';

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

  const getDate = (source, delimiter = '-') => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    return year + '-' + month + '-' + day + '의 일기';
  };

  const defaultTitle = getDate();

  const [isFirstPage, setIsFirstPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const [nickname, setNickname] = useState('danim');
  const [title, setTitle] = useState(defaultTitle);

  const [imgErrSuccess, setImgErrSuccess] = useState([0, 0]);

  const [tripDate, setTripDate] = useState([]);
  const [whereWhen, setWhereWhen] = useState([]);
  const [photos, setPhotos] = useState([]);

  // 이거 계속
  useEffect(() => {
    setNickname(toJS(user.user).nickname);
  }, [user]);

  // useEffect(() => {
  //   // photo 배열 시간순으로 정렬 근데 이렇게 배열하는게 맞나
  //   setPhoto(
  //     photo.sort(function (a, b) {
  //       const dateA = a.date;
  //       const dateB = b.date;
  //       if (dateA < dateB) {
  //         return -1;
  //       } else if (dateA > dateB) {
  //         return 1;
  //       }
  //       return 0;
  //     }),
  //   );
  // }, [photo]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleFileChange = async (e) => {
    setImgErrSuccess([0, 0]);
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        console.log('파일체인지 작동!');
        const exifData = await getMetaData(e.target.files[i]);
        // exifData가 없으면 imgErr 숫자 하나 올려줌
        if (!exifData) {
          setImgErrSuccess((imgErrSuccess) => [
            imgErrSuccess[0] + 1,
            imgErrSuccess[1],
          ]);
          console.log(e.target.files[i], 'gps 데이터 없는 파일');
          return;
        }

        new Compressor(e.target.files[i], {
          quality: 0.8,
          success(result) {
            console.log('이미지 압축완료', result);
            // let imgObj = {
            //   file: result,
            //   date: exifData.dateTimeDigitized,
            //   latitude: exifData.latitude,
            //   longtitude: exifData.longtitude,
            // };
            const formData = new FormData();
            formData.append('file', result, result.name);
            formData.append('date', exifData.dateTimeDigitized);
            formData.append('latitude', exifData.latitude);
            formData.append('longtitude', exifData.longtitude);
            // console.log('현재 imgObj', imgObj);
            console.log(formData);
            handleStoryPhotoSubmit(formData);
          },
        });
      }
    }
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

  const handleStoryPhotoSubmit = (obj) => {
    user
      .setStoryPhoto(obj)
      .then((res) => {
        if (res) {
          // // 서버에서 정보 오면 성공 +1 해줌
          setImgErrSuccess((imgErrSuccess) => [
            imgErrSuccess[0],
            imgErrSuccess[1] + 1,
          ]);
          // // 서버에서 정보 오면 날짜만 따로 언제부터 언제인지랑 날짜/장소/주소 계산
          calculateDatesSpacesAdresses(res.data);
          let obj = {
            adress: res.data.adress,
            content: null,
            date: res.data.date,
            fileName: res.data.filename,
            latitude: res.data.latitude,
            longtitude: res.data.longtitude,
            spaceName: res.data.spaceName,
            tag: null,
            key: uuid(),
          };
          // // 서버로 부터 정보 받아와서 photo에 저장
          setPhotos((photos) => [...photos, obj]);
          console.log('나는 레스', res.data);
          console.log('나는 유저인포', nickname);
          console.log(photos);
          return;
        } else {
          alert('스토리작성에 문제가 발생했습니다');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const calculateDatesSpacesAdresses = (data) => {
    if (!tripDate.includes(data.date.slice(0, 10))) {
      setTripDate((tripDate) => [...tripDate, data.date.slice(0, 10)]);
    }
    // let orderCheck = null;
    let newWhereWhen = {
      date: data.date.slice(0, 10),
      spaceName: data.placeName,
      adress: data.adress,
      order: null,
    };

    // if (orderCheck === null) {
    //   orderCheck = 0;
    // } else if (
    //   JSON.stringify(newWhereWhen) ===
    //   JSON.stringify(whereWhen[whereWhen.length - 1])
    // ) {
    //   orderCheck += 1;
    // }
    if (whereWhen.length === 0) {
      setWhereWhen([newWhereWhen]);
    } else {
      for (let i = 0; i < whereWhen.length; i++) {
        console.log('나는 new', JSON.stringify(newWhereWhen));
        console.log('나는 비교대상', JSON.stringify(whereWhen[i]));
        if (JSON.stringify(newWhereWhen) !== JSON.stringify(whereWhen[i])) {
          setWhereWhen((whereWhen) => [...whereWhen, newWhereWhen]);
        }
      }
      // 얘도 그냥 new set 해버리는게 낫나...
      // 왜 객체 같은거 들어갔는데 인식을 못하지 싶음
      // setWhereWhen((whereWhen) => new Set([...whereWhen, newWhereWhen]));
      // if (whereWhen.includes(newWhereWhen)) {
      //   setWhereWhen((whereWhen) => [...whereWhen, newWhereWhen]);
      // }
    }
    return;
  };

  const handlePageChange = () => {
    setIsFirstPage(false);
    console.log('퍼스트 페이지 체인지 성공');
    setLoading(true);
    console.log('로딩페이지 성공!');
  };

  return (
    <>
      <HeaderGoBack />
      <Container maxWidth="xs" className={classes.root}>
        {/* <MemoWrite title={title} /> */}
        {isFirstPage && (
          <TitleCreate
            nickname={nickname}
            defaultTitle={defaultTitle}
            onTitleChange={handleTitleChange}
            onFileChange={handleFileChange}
            onPageChange={handlePageChange}
          />
        )}
        {loading && <Loading />}
        {!isFirstPage && !loading && (
          <MemoWrite
            title={title}
            photos={photos}
            imgErrSuccess={imgErrSuccess}
            tripDate={tripDate}
            whereWhen={whereWhen}
            nickname={nickname}
          />
        )}
      </Container>
    </>
  );
});

export default BoardCreate;
