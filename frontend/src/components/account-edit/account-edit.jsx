import React, { useEffect, useState } from 'react';
import { HeaderGoBack } from '../';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import InputValidator from '../../util/input-validator';
import {
  makeStyles,
  Button,
  Container,
  TextField,
  Snackbar,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormControl,
  Avatar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useUser from '../../hooks/useUser';
import Compressor from 'compressorjs';
import { useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  avatarChangeBtn: {
    color: 'whitesmoke',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  left: {
    display: 'flex',
    justifyContent: 'center',
    width: '30%',
  },
  right: {
    width: '70%',
  },
  editBtn: {
    border: '1px solid darkgray',
    borderRadius: '0.2em',
    padding: '0.1em 5em',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit_button: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    color: 'whitesmoke',
  },
  genderGroup: {
    margin: 'auto',
  },
  inputFile: {
    display: 'none',
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AccountEdit = observer(() => {
  const classes = useStyles();

  const user = useUser();
  const [nickname, setNickname] = useState('');
  const [errorTextNickname, setErrorTextNickname] = useState('');
  const [age, setAge] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const fileRef = useRef();
  const [snackbarInfo, setSnackbarInfo] = useState({
    isShow: false,
    msg: '',
    state: '',
  });

  useEffect(() => {
    const userInfo = toJS(user.user);
    setNickname(userInfo.nickname || '닉네임을 적어주세요.');
    setIntroduce(userInfo.introduce || '자기소개를 적어주세요.');
    setAge(userInfo.age || 0);
    setGender(userInfo.gender || 'M');
    setAvatar(
      process.env.REACT_APP_IMAGE_BASE_URL +
        userInfo.nickname +
        '/' +
        userInfo.profile || '',
    );
  }, [user.user]);

  const checkNickname = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
    if (InputValidator.checkNickname(nickname)) {
      setErrorTextNickname('');
    } else {
      setErrorTextNickname('올바른 닉네임을 입력해주세요.');
    }
  };

  const handleIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleAge = (e) => {
    if (e.target.value > 200 || e.target.value < 1) return;
    setAge(e.target.value);
  };

  const onButtonClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    new Compressor(file, {
      quality: 0.6,
      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        const formData = new FormData();

        // The third parameter is required for server
        formData.append('file', result, result.name);
        formData.append('nickname', toJS(user.user).nickname);

        // Send the compressed image file to server with XMLHttpRequest.
        user.updateAvatar(formData).then((res) => {
          const imgURL =
            process.env.REACT_APP_IMAGE_BASE_URL + nickname + '/' + res;
          setAvatar(imgURL);
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    const res = await user.updateUserInfo({
      age: age,
      gender: gender,
      introduce: introduce,
      nickname: nickname,
      profile: avatar.split('/')[5],
    });

    if (res) {
      setSnackbarInfo({
        isShow: true,
        msg: '회원 정보 수정 성공!',
        state: 'success',
      });
    } else {
      setSnackbarInfo({
        isShow: true,
        msg: '회원 정보 수정 실패!',
        state: 'error',
      });
    }
  };

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarInfo({
      ...snackbarInfo,
      isShow: false,
    });
  };

  return (
    <>
      <HeaderGoBack title={'프로필 편집'} />
      <Container className={classes.paper} component="main" maxWidth="xs">
        <div className={classes.profile}>
          <div className={classes.left}>
            <Avatar
              className={classes.avatar}
              alt={toJS(user.user).nickname}
              src={avatar}
            />
          </div>
          <div className={classes.right}>
            <h1 className="nickname">{toJS(user.user).nickname}</h1>
            <Button
              className={classes.avatarChangeBtn}
              onClick={onButtonClick}
              variant="contained"
              color="primary"
            >
              프로필 사진 변경
            </Button>
            <input
              type="file"
              onChange={changeAvatar}
              ref={fileRef}
              className={classes.inputFile}
            />
          </div>
        </div>

        <form className={classes.root}>
          <TextField
            required
            fullWidth
            value={nickname}
            id="nickname"
            type="text"
            variant="outlined"
            margin="normal"
            label="닉네임"
            autoFocus
            onChange={checkNickname}
            error={errorTextNickname !== '' ? true : false}
            helperText={errorTextNickname}
          />
          <TextField
            required
            fullWidth
            value={introduce}
            id="introduce"
            type="text"
            label="소개"
            variant="outlined"
            margin="normal"
            autoFocus
            onChange={handleIntroduce}
          />
          <TextField
            required
            value={age}
            id="standard-number"
            type="number"
            label="나이"
            margin="normal"
            onChange={handleAge}
            style={{ width: '10em' }}
            InputProps={{
              inputProps: { min: 1, max: 200 },
            }}
          />
          <FormControl
            component="fieldset"
            className={classes.genderForm}
            margin="normal"
          >
            <FormLabel component="legend">성별</FormLabel>
            <RadioGroup
              className={classes.genderGroup}
              value={gender}
              row
              aria-label="gender"
              name="genderValue"
              onChange={handleGender}
            >
              <FormControlLabel
                value="F"
                control={<Radio color="primary" />}
                label="여자"
              />
              <FormControlLabel
                value="M"
                control={<Radio color="primary" />}
                label="남자"
              />
            </RadioGroup>
          </FormControl>
          <Button
            className={classes.submit_button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpdateUserInfo}
          >
            수정
          </Button>
          <Snackbar
            open={snackbarInfo.isShow}
            autoHideDuration={700}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={snackbarInfo.state}>
              {snackbarInfo.msg}
            </Alert>
          </Snackbar>
        </form>
      </Container>
    </>
  );
});

export default AccountEdit;
