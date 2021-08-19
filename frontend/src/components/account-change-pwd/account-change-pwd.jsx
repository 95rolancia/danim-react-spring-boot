import React, { useState } from 'react';
import { HeaderGoBack } from '..';
import { observer } from 'mobx-react-lite';
import InputValidator from '../../util/input-validator';
import {
  makeStyles,
  Button,
  Container,
  TextField,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
  },
  // root: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },

  submit_button: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    color: 'whitesmoke',
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AccountChangePwd = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();
  const [originPassword, setOriginPassword] = useState('');
  const [errorTextOrigin, setErrorTextOrigin] = useState('');
  const [newPasswordFirst, setNewPasswordFirst] = useState('');
  const [errorTextFirst, setErrorTextFirst] = useState('');
  const [newPasswordSecond, setNewPasswordSecond] = useState('');
  const [errorTextSecond, setErrorTextSecond] = useState('');
  const [snackbarInfo, setSnackbarInfo] = useState({
    isShow: false,
    msg: '',
    state: '',
  });

  const handlePwd = async (e) => {
    setOriginPassword(e.target.value);
  };

  useEffect(() => {
    if (InputValidator.checkPassword(originPassword)) {
      setErrorTextOrigin('');
    } else {
      setErrorTextOrigin('비밀번호는 영문,숫자 포함 8~12글자입니다.');
    }
  }, [originPassword]);

  const handleFirstPwd = (e) => {
    setNewPasswordFirst(e.target.value);
  };

  useEffect(() => {
    if (InputValidator.checkPassword(newPasswordFirst)) {
      setErrorTextFirst('');
    } else {
      setErrorTextFirst('비밀번호는 영문,숫자 포함 8~12글자입니다.');
    }
  }, [newPasswordFirst]);

  const handleSecondPwd = (e) => {
    setNewPasswordSecond(e.target.value);
  };

  useEffect(() => {
    if (newPasswordFirst === newPasswordSecond) {
      setErrorTextSecond('');
    } else {
      setErrorTextSecond('비밀번호 불일치');
    }
  }, [newPasswordFirst, newPasswordSecond]);

  const updatePassword = async (e) => {
    e.preventDefault();
    const res = await user.updatePassword({
      lastPassword: originPassword,
      password: newPasswordSecond,
    });

    if (res) {
      alert('비밀번호 변경 성공!');
      history.push(`/main/${toJS(user.user).nickname}`);
    } else {
      setSnackbarInfo({
        isShow: true,
        msg: '비밀번호 변경 실패!',
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
      <HeaderGoBack title={'비밀번호 변경'} />
      <Container className={classes.paper} component="main" maxWidth="xs">
        <form className={classes.root}>
          <input
            type="text"
            name="email"
            value="..."
            autoComplete="username email"
            hidden
            readOnly
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="기존 비밀번호"
            type="password"
            variant="outlined"
            autoComplete="off"
            onChange={handlePwd}
            value={originPassword}
            error={errorTextOrigin !== '' ? true : false}
            helperText={errorTextOrigin}
          />

          <TextField
            required
            fullWidth
            margin="normal"
            label="비밀번호(영문,숫자 포함 8~12글자)"
            type="password"
            variant="outlined"
            autoComplete="off"
            onChange={handleFirstPwd}
            error={errorTextFirst !== '' ? true : false}
            helperText={errorTextFirst}
          />

          <TextField
            required
            fullWidth
            margin="normal"
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            autoComplete="off"
            onChange={handleSecondPwd}
            error={errorTextSecond !== '' ? true : false}
            helperText={errorTextSecond}
          />

          <Button
            className={classes.submit_button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={updatePassword}
          >
            비밀번호 변경
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

export default AccountChangePwd;
