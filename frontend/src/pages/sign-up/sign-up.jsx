import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Snackbar,
  Divider,
  Box,
} from '@material-ui/core';
import { Send, Check } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import InputValidator from '../../util/input-validator';
import { SignUpDto } from '../../model/sign-up-dto';
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
  inputfill: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '20rem',
  },
  icons: {
    color: '#0091ea',
  },
  signUpBtn: {
    background:
      'linear-gradient(90deg, rgba(145,197,255,0.98) 30%, rgba(255,202,159,1) 100%)',
    border: 0,
    borderRadius: 50,
    boxShadow: '0 3px 5px 2px rgba(255,105,135, .3)',
    color: 'white',
    height: '3em',
    width: '10em',
    margin: theme.spacing(2),
  },
  containerWrap: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  section: {
    margin: theme.spacing(3),
  },
  goSignInButton: {
    border: 0,
    borderRadius: 50,
    boxShadow: '0 3px 5px 2px rgba(255,105,135, .3)',
    color: 'darkgrey',
    height: '3em',
    width: '10em',
    margin: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [errorTextEmail, setErrorTextEmail] = useState('');
  const [errorTextNickname, setErrorTextNickname] = useState('');
  const [errorTextPassword, setErrorTextPassword] = useState('');
  const [errorTextConfirm, setErrorTextConfirm] = useState('');
  const [displayEmailAuth, setDisplayEmailAuth] = useState('none');
  const [emailAuthCode, setEmailAuthCode] = useState(0);
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

  const handleNickname = (e) => {
    const nickname = e.target.value;
    if (InputValidator.checkNickname(nickname)) {
      setNickname(nickname);
      setErrorTextNickname('');
    } else {
      setNickname('');
      setErrorTextNickname('닉네임은 한글, 영문포함 2~12글자만 가능합니다.');
    }
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    if (InputValidator.checkPassword(password)) {
      setPassword(password);
      setErrorTextPassword('');
    } else {
      setPassword('');
      setErrorTextPassword('비밀번호는 영문,숫자 포함 8~12글자입니다.');
    }
    setconfirmPassword(false);
  };

  const handleConfirm = (e) => {
    const confirm = e.target.value;
    if (password === confirm) {
      setconfirmPassword(true);
      setErrorTextConfirm('');
    } else {
      setErrorTextConfirm('비밀번호 불일치');
    }
  };

  const handleGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };

  const handleAge = (e) => {
    const age = e.target.value;
    if (e.target.value > 200 || e.target.value < 1) return;
    setAge(age);
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

  const handleAuth = (e) => {
    const code = e.target.value;
    setEmailAuthCode(code);
  };

  const sendEmail = async () => {
    if (errorTextEmail !== '' || email === '') {
      setSnackbarInfo({
        isShow: true,
        msg: '올바른 이메일을 입력해주세요.',
        state: 'error',
      });
      return;
    }
    await auth.duplicateCheckEmail({
      userId: email,
    });

    if (auth.isEmailDuplicated) {
      setSnackbarInfo({
        isShow: true,
        msg: '이미 가입된 이메일입니다.',
        state: 'error',
      });
      setErrorTextEmail('다른 이메일을 입력해주세요.');
    } else {
      setDisplayEmailAuth('block');
      setDisabledEmailInput(true);
    }
  };

  const sendNickname = async () => {
    if (errorTextNickname !== '' || nickname === '') {
      // setSnackbarInfo({
      //   isShow: true,
      //   msg: '닉네임 형식을 지켜주세요.',
      //   state: 'error',
      // });
      return;
    }
    await auth.duplicateCheckNickname({
      nickname: nickname,
    });
    if (auth.isNickNameDuplicated) {
      setErrorTextNickname('중복된 닉네임은 불가능합니다');
    } else {
      setSnackbarInfo({
        isShow: true,
        msg: '사용 가능한 닉네임입니다.',
        state: 'success',
      });
    }
  };

  const checkEmailAuthCode = async () => {
    await auth.authEmailCode({
      userId: email,
      key: emailAuthCode,
    });
    if (auth.isEmailCodeAuthroized) {
      setSnackbarInfo({
        isShow: true,
        msg: '인증 코드가 틀렸습니다.',
        state: 'error',
      });
    } else {
      setSnackbarInfo({
        isShow: true,
        msg: '이메일 인증이 완료되었습니다.',
        state: 'error',
      });
      setDisplayEmailAuth('none');
    }
  };

  const checkForm = () => {
    if (
      auth.isEmailDuplicated ||
      !confirmPassword ||
      auth.isNickNameDuplicated ||
      auth.isEmailCodeAuthroized ||
      gender === '' ||
      age === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!checkForm()) {
      setSnackbarInfo({
        isShow: true,
        msg: '비어있는 정보가 있습니다.',
        state: 'error',
      });
    } else {
      const res = await auth.signUp(
        new SignUpDto(email, password, nickname, gender, +age, emailAuthCode),
      );

      if (res) {
        alert('회원 가입이 완료되었습니다.');
        history.push('/');
      } else {
        setSnackbarInfo({
          isShow: true,
          msg: '오류가 발생했습니다. 다시 시도해주세요.',
          state: 'error',
        });
      }
    }
  };

  const goToSignin = () => {
    history.push('/');
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
          회원가입
        </Typography>
        <form className={classes.root} noValidate>
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
              variant="outlined"
              color="primary"
              size="large"
              onClick={sendEmail}
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
              type="text"
              style={{ width: '10em' }}
              onChange={handleAuth}
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
                onClick={checkEmailAuthCode}
              >
                확인
              </Button>
            </div>
          </Box>
          <div className={classes.input}>
            <TextField
              required
              id="outlined-required-nickname"
              label="닉네임"
              variant="outlined"
              onChange={handleNickname}
              error={errorTextNickname !== '' ? true : false}
              helperText={errorTextNickname}
            />
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={sendNickname}
            >
              <Check className={classes.icons} />
            </Button>
          </div>
          <div className={classes.inputfill}>
            <TextField
              required
              id="outlined-password-input"
              label="비밀번호(영문,숫자 포함 8~12글자)"
              type="password"
              variant="outlined"
              onChange={handlePassword}
              autoComplete="off"
              error={errorTextPassword !== '' ? true : false}
              helperText={errorTextPassword}
            />
          </div>
          <div className={classes.inputfill}>
            <TextField
              required
              id="outlined-password-input-confirm"
              label="비밀번호 확인"
              type="password"
              variant="outlined"
              onChange={handleConfirm}
              autoComplete="off"
              error={errorTextConfirm !== '' ? true : false}
              helperText={errorTextConfirm}
            />
          </div>
          <Divider light />
          <div className={classes.section}></div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">성별</FormLabel>
              <RadioGroup
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
          </div>

          <TextField
            required
            id="standard-number"
            label="나이"
            type="number"
            onChange={handleAge}
            style={{ width: '10em' }}
            InputProps={{
              inputProps: { min: 1, max: 200 },
            }}
          />
          <div className={classes.divider}></div>
          <Button className={classes.goSignInButton} onClick={goToSignin}>
            돌아가기
          </Button>
          <Button className={classes.signUpBtn} onClick={submitForm}>
            가입하기
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
      </div>
    </Container>
  );
});

export default SignUp;
