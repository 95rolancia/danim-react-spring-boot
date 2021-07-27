import React, { useState } from 'react';
// https://www.daleseo.com/material-ui-typography/ 참고
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js 참고
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Link } from '@material-ui/core';
import HttpClient from '../../service/http-client';
import { SignInDto } from '../../model/sign-in-dto';
import { useHistory } from 'react-router-dom';

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
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: '',
  },
  grid_items: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
  },
  grid_items_bar: {
    padding: theme.spacing(0.5),
    textAlign: 'center',
    borderRight: 'solid 0.1em',
  },
}));

// https://www.bezkoder.com/react-hooks-jwt-auth/ 참고
const SignIn = () => {
  // material ui 쓰려고 만든 것
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  // 아이디 저장은 또 어떻게 구현하지... 일단 다음에 생각
  // const [checkbox, setCheckbox] = useState(false);

  // const [emailHelperText, setEmailHelperText] = useState("");
  // const [pwdHelperText, setPwdHelperText] = useState("");
  // const [isBtnAble, setIsBtnAbled] = useState(false);
  // const [isError, setIsError] = useState("");

  // 이메일 입력창 관리 : 비효율적...??
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    // if (email === "") {
    //   // 이메일칸이 공란이면 helper text를 비워둔다
    //   setEmailHelperText("")
    // } else if (!checkEmail(email)) {
    //   // 이메일 체크가 false인 경우, helper text 출력
    //   setEmailHelperText("@를 포함한 이메일 형식으로 작성해주세요.")
    // }
  };
  // 비밀번호 입력창 관리
  const onChangePwd = (e) => {
    const pwd = e.target.value;
    setPwd(pwd);
    // if (pwd === "") {
    //   // 이메일칸이 공란이면 helper text를 비워둔다
    //   setPwdHelperText("")
    // } else if (!checkEmail(pwd)) {
    //   // 이메일 체크가 false인 경우, helper text 출력
    //   setPwdHelperText("비밀번호는 ~ 입니다.")
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await HttpClient.signIn(new SignInDto(email, pwd));
    // res 처리
    console.log(res);
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Typography component="h1" variant="h3" align="center">
          다님
        </Typography>
        <Typography component="h1" variant="h5" align="center">
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
            // // Email 바뀌는 것 감지
            onChange={onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            // // 비밀번호 바뀌는 것 감지
            onChange={onChangePwd}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="아이디 저장"
          />
          <Grid container>
            <Grid item xs={4} className={classes.grid_items_bar}>
              <Link href="#" color="inherit">
                아이디 찾기
              </Link>
            </Grid>
            <Grid item xs={4} className={classes.grid_items_bar}>
              <Link href="#" color="inherit">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item xs={4} className={classes.grid_items}>
              <Link onClick={() => history.push('/signup')} color="inherit">
                회원가입
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit_button}
            // // 클릭하면 submit된다.
            onClick={handleSubmit}
          >
            로그인
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
