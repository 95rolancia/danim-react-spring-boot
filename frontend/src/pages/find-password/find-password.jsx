import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
  Snackbar,
  Box,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import InputValidator from '../../util/input-validator';
import useAuth from '../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
  },
  title: {
    fontFamily: 'MingukBold',
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '20rem',
  },
  sendEmailButton: {
    marginBottom: theme.spacing(2.5),
  },
  containerWrap: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  goBackButton: {
    color: 'whitesmoke',
    marginTop: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FindPassword = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [errorTextEmail, setErrorTextEmail] = useState('');
  const [displayEmailAuth, setDisplayEmailAuth] = useState('none');
  const [emailAuthCode, setEmailAuthCode] = useState(0);
  const [newPassword, setNewPassword] = useState();
  const [disabledEmailInput, setDisabledEmailInput] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    isShow: false,
    msg: '',
    state: '',
  });

  const handleEmail = (e) => {
    const email = e.target.value;
    if (InputValidator.checkEmail(email)) {
      setEmail(email);
      setErrorTextEmail('');
    } else {
      setEmail('');
      setErrorTextEmail('올바른 이메일을 입력해주세요.');
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

  const handleDisplay = () => {
    setDisplayEmailAuth('none');
    setDisabledEmailInput(false);
  };

  const handleAuthCode = (e) => {
    setEmailAuthCode(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const authEmail = async () => {
    if (errorTextEmail !== '' || email === '') {
      setSnackbarInfo({
        isShow: true,
        msg: '올바른 이메일을 입력해주세요.',
        state: 'error',
      });
      return;
    }

    const res = await auth.getEmailAuthCode({
      userId: email,
    });

    if (!res || res === 403) {
      setSnackbarInfo({
        isShow: true,
        msg: '오류가 발생했습니다. 다시 시도해주세요.',
        state: 'error',
      });
      setErrorTextEmail('다른 이메일을 입력해주세요.');
    } else {
      setDisplayEmailAuth('block');
      setDisabledEmailInput(true);
    }
  };

  const submitAuthCodeNPwd = async () => {
    if (emailAuthCode.length !== 6) {
      alert('인증번호는 6자리입니다.');
      return;
    }

    const res = await auth.resetPassword({
      userId: email,
      key: emailAuthCode,
      password: newPassword,
    });

    if (!res) {
      setSnackbarInfo({
        isShow: true,
        msg: '인증 코드가 틀렸습니다.',
        state: 'error',
      });
    } else {
      alert('이메일 인증이 완료되었습니다.');
      goToLogin();
    }
  };

  const goToLogin = () => {
    history.push('/signin');
  };

  return (
    <Container maxWidth="sm" className={classes.containerWrap}>
      <div className={classes.paper}>
        <Typography
          color="primary"
          className={classes.title}
          variant="h4"
          gutterBottom
        >
          비밀번호 찾기
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.input}>
            <TextField
              required
              id="outlined-required-email"
              label="이메일 아이디"
              variant="outlined"
              error={errorTextEmail !== '' ? true : false}
              onChange={handleEmail}
              helperText={errorTextEmail}
              disabled={disabledEmailInput}
            />
            <Button
              className={classes.sendEmailButton}
              variant="outlined"
              color="primary"
              size="large"
              onClick={authEmail}
            >
              <Send className={classes.icons} />
            </Button>
          </div>
          <Box display={displayEmailAuth}>
            <Typography variant="h6" gutterBottom>
              이메일 인증
            </Typography>
            <Typography variant="caption" display="block">
              {email}으로 <br />
              전송된 인증번호를 입력해주세요.
            </Typography>

            <TextField
              id="standard-password-input-email-code"
              type="password"
              style={{ width: '10em' }}
              label="인증 번호"
              onChange={handleAuthCode}
            ></TextField>

            <TextField
              id="standard-password-input-email-code"
              type="password"
              style={{ width: '10em' }}
              label="변경 후 비밀번호"
              onChange={handleNewPassword}
            ></TextField>

            <div>
              <Button
                style={{ marginRight: '0.5em' }}
                variant="outlined"
                color="secondary"
                size="large"
                onClick={handleDisplay}
              >
                취소
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={submitAuthCodeNPwd}
              >
                확인
              </Button>
            </div>
          </Box>
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
      </div>
      <Button
        className={classes.goBackButton}
        onClick={goToLogin}
        variant="contained"
        color="primary"
      >
        돌아가기
      </Button>
    </Container>
  );
});

export default FindPassword;
