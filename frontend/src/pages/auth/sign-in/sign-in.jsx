import React, { useState } from 'react';
import {
  makeStyles,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';
import HttpClient from '../../../service/http-client';
import { SignInDto } from '../../../model/sign-in-dto';
import { useHistory } from 'react-router-dom';
import InputValidator from '../../../util/input-validator';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit_button: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: '',
  },
  grid_items: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
  },
}));

const SignIn = observer(({ authStore }) => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorTextEmail, setErrorTextEmail] = useState('');
  const [errorTextPassword, setErrorTextPassword] = useState('');

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (InputValidator.checkEmail(email)) {
      setErrorTextEmail('');
    } else {
      setErrorTextEmail('올바른 이메일을 입력해주세요.');
    }
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    if (InputValidator.checkPassword(password)) {
      setErrorTextPassword('');
    } else {
      setErrorTextPassword('비밀번호는 영문,숫자 포함 8~12글자입니다.');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await authStore.signIn(new SignInDto(email, password));
    if (authStore.isLoggedIn) {
      alert('로그인에 성공했습니다.');
      history.push('/interest');
      return;
    }
    alert('로그인에 실패했습니다.');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h3" variant="h3" align="center">
          다님
        </Typography>
        <Typography component="h5" variant="h5" align="center">
          DANIM
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Email ID"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmail}
            error={errorTextEmail !== '' ? true : false}
            helperText={errorTextEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            type="password"
            onChange={handlePassword}
            error={errorTextPassword !== '' ? true : false}
            helperText={errorTextPassword}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit_button}
            onClick={handleSignIn}
          >
            로그인
          </Button>
          <Grid container justifyContent="space-between">
            <Button onClick={() => {}}>비밀번호 찾기</Button>
            <Button
              color="primary"
              onClick={() => {
                history.push('/signup');
              }}
            >
              회원가입
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
});

export default SignIn;
