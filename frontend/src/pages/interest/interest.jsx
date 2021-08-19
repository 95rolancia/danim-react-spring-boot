import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useUser from '../../hooks/useUser';
import { SelectedAreaChip, AreaChip } from './components';
import {
  Container,
  Button,
  Divider,
  makeStyles,
  Typography,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  intro: {
    marginTop: theme.spacing(3),
  },
  selectedBox: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    height: '2em',
  },
  divider: {
    backgroundColor: '#4F9EE8',
    height: '0.1em',
  },
  dividerRed: {
    backgroundColor: 'red',
    height: '0.1em',
  },
  chipBox: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap',
  },
  registButton: {
    width: '45%',
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: '30px',
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
  cancelButton: {
    width: '45%',
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: '30px',
  },
}));

const initialAreaDatas = [
  { label: '서울', state: 'unselected' },
  { label: '부산', state: 'unselected' },
  { label: '대구', state: 'unselected' },
  { label: '인천', state: 'unselected' },
  { label: '광주', state: 'unselected' },
  { label: '대전', state: 'unselected' },
  { label: '울산', state: 'unselected' },
  { label: '세종', state: 'unselected' },
  { label: '경기', state: 'unselected' },
  { label: '강원', state: 'unselected' },
  { label: '충북', state: 'unselected' },
  { label: '충남', state: 'unselected' },
  { label: '전북', state: 'unselected' },
  { label: '전남', state: 'unselected' },
  { label: '경북', state: 'unselected' },
  { label: '경남', state: 'unselected' },
  { label: '제주', state: 'unselected' },
];

const Interest = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();
  const [chipData, setChipData] = useState(initialAreaDatas);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedBoxColor, setSelectedBoxrColor] = useState('default');
  const [nickname, setNickname] = useState('danim');
  const [snackbarInfo, setSnackbarInfo] = useState({
    isShow: false,
    msg: '',
    state: '',
  });

  useEffect(() => {
    const prevPath = history.location.state.prevPath;
    if (
      (prevPath === '/signin' || prevPath === '/') &&
      toJS(user.user).areas.length > 0
    ) {
      goToMain();
    } else {
      const initialSelectedAreas = [];
      const userInterestAreas = chipData.map((chip) => {
        if (toJS(user.user).areas.includes(chip.label)) {
          initialSelectedAreas.push(chip);
          return { ...chip, state: 'selected' };
        } else {
          return { ...chip, state: 'unselected' };
        }
      });
      setChipData(userInterestAreas);
      setSelectedAreas(initialSelectedAreas);
    }
    setNickname(toJS(user.user).nickname);
  }, []);

  const handleClick = (chip) => {
    if (chip.state === 'selected') {
      handleDelete(chip);
    } else {
      if (selectedAreas.length >= 3) {
        setSelectedBoxrColor('red');
        setTimeout(() => {
          setSelectedBoxrColor('default');
        }, 500);
      } else {
        const newChipData = chipData.map((item) => {
          if (item.label === chip.label) {
            item.state = 'selected';
          }
          return item;
        });
        setChipData(newChipData);
        setSelectedAreas([...selectedAreas, chip]);
      }
    }
  };

  const handleDelete = (chip) => {
    const newChipData = chipData.map((item) => {
      if (item.label === chip.label) {
        item.state = 'unselected';
      }
      return item;
    });

    setChipData(newChipData);
    setSelectedAreas(selectedAreas.filter((area) => area.label !== chip.label));
  };

  const handleInterestSubmit = () => {
    const data = selectedAreas.map((chip) => chip.label);
    if (data.length < 1) {
      setSnackbarInfo({
        isShow: true,
        msg: '최소 한 개 이상 선택하셔야해요!',
        state: 'error',
      });
      return;
    }

    const areas = {
      areas: [...data],
    };

    user.setInterestArea(areas).then(() => {
      goToMain();
    });
  };

  const goToMain = () => {
    if (toJS(user.user).areas.length < 1) {
      setSnackbarInfo({
        isShow: true,
        msg: '최소 한 개 이상 선택하셔야해요!',
        state: 'error',
      });
      return;
    }
    history.push('/main');
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
    <Container>
      <div className={classes.root}>
        <Typography className={classes.intro} variant="h5">
          안녕하세요, {nickname}!님
          <br />
          어디를 소개해드릴까요?
        </Typography>
        <div className={classes.selectedBox}>
          {selectedAreas.map((chip) => (
            <SelectedAreaChip
              key={chip.label}
              place={chip}
              onDelete={handleDelete}
              onClick={handleDelete}
            />
          ))}
        </div>
        <Divider
          className={
            selectedBoxColor === 'default'
              ? classes.divider
              : classes.dividerRed
          }
        />
        <Typography
          align="right"
          variant="caption"
          display="block"
          color={selectedBoxColor === 'default' ? 'primary' : 'secondary'}
        >
          관심 지역은 3개까지만 설정하실 수 있어요.
        </Typography>
        <div className={classes.chipBox}>
          {chipData.map((place) => (
            <AreaChip key={place.label} place={place} onClick={handleClick} />
          ))}
        </div>
      </div>

      <Button
        variant="outlined"
        color="secondary"
        className={classes.cancelButton}
        onClick={goToMain}
      >
        돌아가기
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.registButton}
        onClick={handleInterestSubmit}
      >
        등록
      </Button>
      <Snackbar
        open={snackbarInfo.isShow}
        autoHideDuration={700}
        onClose={handleClose}
      >
        <Alert severity={snackbarInfo.state} onClose={handleClose}>
          {snackbarInfo.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
});

export default Interest;
