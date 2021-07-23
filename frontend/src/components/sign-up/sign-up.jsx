import { Button, Container, makeStyles,  TextField, Typography, FormControl ,FormControlLabel, FormLabel, RadioGroup, Radio,Snackbar,  Divider, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { useState } from 'react';
import { InputValidator } from '../../util/input-validator';
const validator = new InputValidator();
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        }
    },
    input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width:'20rem',
    },
    inputfill: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width:'20rem',
    },
    icons: {
        color:'#0091ea',
    },
    signUpBtn: {
        background: 'linear-gradient(90deg, rgba(145,197,255,0.9867297260701156) 30%, rgba(255,202,159,1) 100%)',
        border: 0,
        borderRadius:50,
        boxShadow: '0 3px 5px 2px rgba(255,105,135, .3)',
        color: 'white',
        height: '3em',
        width:'10em',
        margin: theme.spacing(2),
    },
    containerWrap: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
    },
    section: {
        margin : theme.spacing(3),
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}
const SignUp = () => {
    const classes = useStyles();

    const [Email, setEmail] = useState("");
    const [confirmEmail, setconfirmEmail] = useState(false);
    const [Nickname, setNickname] = useState("");
    const [confirmNickname, setConfirmNickname] = useState(false);
    const [Password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState(false);
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(0);
    const [errorTextEmail, setErrorTextEmail] = useState("");
    const [errorTextNickname, setErrorTextNickname] = useState("");
    const [errorTextPassword, setErrorTextPassword] = useState("");
    const [errorTextConfirm, setErrorTextConfirm] = useState("");
    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState('none');
    const [code, setCode] = useState(0);
    const [confirmCode, setConfirmCode] = useState(false);
    const [disabled, setDisabled] = useState('');
    const handleGender = (e) => {
        setGender(e.target.value);
    }
    
    const handleEmail = (e) => {
        const email = e.target.value;
        if (validator.checkEmail(email)) {
            setEmail(email);
            setErrorTextEmail("")
        } else {
            setEmail("");
            setErrorTextEmail("올바른 이메일을 입력해주세요.")
        }
        setconfirmEmail(false)
    }

    const handleNickname = (e) => {
        setNickname(e.target.value);
        setConfirmNickname(false)
    }

    const handlePassword = (e) => {
        const password = e.target.value;
        if (validator.checkPassword(password)) {
            setPassword(password);
            setErrorTextPassword("");
        } else {
            setPassword("");
            setErrorTextPassword("비밀번호는 영문,숫자 포함 8~12글자입니다.")
        }
        setconfirmPassword(false)
    }

    const handleConfirm = (e) => {
        const confirm = e.target.value;
        if (Password === confirm) {
            setconfirmPassword(true)
            setErrorTextConfirm("")
        } else {
            setErrorTextConfirm("비밀번호 불일치")
        }
    }

    const handleAge = (e) => {
        const age = e.target.value;
        setAge(age);
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }
    
    const handleDisplay = () => {
        setDisplay('none');
        setDisabled('');
    }

    const handleAuth = (e) => {
        const code = e.target.value;
        setCode(code);
    }

    const sendEmail = () => {
        if (Email) {
           
            //백엔드 통신
            setDisplay('block');
            setconfirmEmail(true)
        } else {
            setconfirmEmail(false)
        }
    }

    const sendNickname = () => {
        if (validator.checkNickname(Nickname)) {
            setErrorTextNickname("")
            //백엔드 통신? 사용 가능하면 true로.
            setConfirmNickname(true)
        } else {
            setErrorTextNickname("닉네임은 한글, 영문포함 2~12글자만 가능합니다.")
            setConfirmNickname(false)
        }

    }

    const checkCode = () => {
        alert(code);
        setDisabled('disabled');
        //백엔드 통신 후 바꿔주기
        setConfirmCode(true);
    }

    const submit = () => {
        if (!confirmEmail || !confirmPassword || !confirmNickname ||
        !confirmCode || gender === '' || age === 0) {
            setOpen(true);
        }else {
            console.log({
                Email,
                Password,
                Nickname,
                gender,
                age
            });

        }
    }  
    return (
        <Container maxWidth="sm" className={classes.containerWrap}>
        <Typography variant="h4" gutterBottom>
            회원가입
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <div className={classes.input}>
                    <TextField required
                        id="outlined-required"
                        label="이메일 아이디"
                        variant="outlined"
                        error={errorTextEmail !== "" ? true : false}
                        onChange={handleEmail}
                        helperText={errorTextEmail}
                        disabled={disabled}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={sendEmail}
                        aria-label="Send verification code by email">
                        <SendIcon
                            className={classes.icons}     
                        />
                    </Button>
                </div>
                <Box display={display}>
                <Typography variant="h6" gutterBottom>
            이메일 인증
                    </Typography>
                    <Typography variant="caption" display="block">
                        {Email}으로 <br />
                        전송된 인증번호를 입력해주세요.
                    </Typography>
                    
                    <TextField
                        id="standard-password-input"
                        type="password"
                        style={{ width: '10em' }}
                        onChange={handleAuth}
                    >

                    </TextField>
                    
                    
                    
                    <div>
                        <Button
                            style={{marginRight:'0.5em'}}
                        variant="outlined"
                        color="secondary"
                        size="large"
                        onClick={handleDisplay}
                        aria-label="Close box"
                        >취소
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={checkCode}
                        aria-label="Close box">확인
                    </Button>
                        </div>
               </Box>
                <div className={classes.input}>
                    <TextField required
                        id="outlined-required"
                        label="닉네임"
                        variant="outlined"
                        onChange={handleNickname}
                        error={errorTextNickname!==""?true:false}
                        helperText={errorTextNickname}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={sendNickname}
                        aria-label="Check if a nickname is available">
                        <CheckIcon
                            className={classes.icons}/>
                    </Button>
                </div>
                <div className={classes.inputfill}>
                    <TextField required
                        id="outlined-password-input"
                        label="비밀번호(영문,숫자 포함 8~12글자)"
                        type="password"
                        variant="outlined"
                        onChange={handlePassword}
                        error={errorTextPassword!==""?true:false}
                        helperText={errorTextPassword}
                    />
                </div>
                <div className={classes.inputfill}>
                <TextField required
                        id="outlined-password-input"
                        label="비밀번호 확인"
                        type="password"
                        variant="outlined"
                        onChange={handleConfirm}
                        error={errorTextConfirm !== "" ? true : false}
                        helperText={errorTextConfirm}
                    />
                </div>
                <Divider primary="Spam" />
                <div className={classes.section}>

                </div>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">성별</FormLabel>
                        <RadioGroup row aria-label="gender" name="genderValue" onChange={handleGender}>
                            <FormControlLabel value="F" control={<Radio color="primary"/>} label="여자" />
                            <FormControlLabel value="M" control={<Radio color="primary"/>} label="남자" />
                        </RadioGroup>
                </FormControl>
                </div>

                <TextField
                    required
                        id="standard-number"
                        label="나이"
                    type="number"
                    onChange={handleAge}
                    style={{width:'10em'}}
                        InputProps={{
                            inputProps: { min: 15, max: 100 },
                        }}
                        />
            <div className={classes.divider}></div>
                <Button className={classes.signUpBtn} onClick={submit}>가입하기</Button>
                <Snackbar open={open} autoHideDuration={700} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        올바른 정보를 기입해주세요.
                    </Alert>
                        </Snackbar>
            </form>
        </Container>
           );
};

export default SignUp;