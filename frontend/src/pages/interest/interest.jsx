import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { SelectedAreaChip, AreaChip } from './components';
import {
  Container,
  Button,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import useUser from '../../hooks/useUser';

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
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: '30px',
    color: 'whitesmoke',
    fontFamily: 'MingukBold',
  },
}));

const Interest = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();
  const [chipData, setChipData] = useState([
    { key: 0, label: '서울', state: 'unselected' },
    { key: 1, label: '부산', state: 'unselected' },
    { key: 2, label: '대구', state: 'unselected' },
    { key: 3, label: '인천', state: 'unselected' },
    { key: 4, label: '광주', state: 'unselected' },
    { key: 5, label: '대전', state: 'unselected' },
    { key: 6, label: '울산', state: 'unselected' },
    { key: 7, label: '세종', state: 'unselected' },
    { key: 8, label: '경기', state: 'unselected' },
    { key: 9, label: '강원', state: 'unselected' },
    { key: 10, label: '충북', state: 'unselected' },
    { key: 11, label: '충남', state: 'unselected' },
    { key: 12, label: '전북', state: 'unselected' },
    { key: 13, label: '전남', state: 'unselected' },
    { key: 14, label: '경북', state: 'unselected' },
    { key: 15, label: '경남', state: 'unselected' },
    { key: 16, label: '제주', state: 'unselected' },
  ]);

  const [selectedChipData, setSelecetedChipData] = useState([]);
  const [selectedBoxColor, setSelectedBoxrColor] = useState('default');
  const [nickname, setNickname] = useState('danim');

  useEffect(() => {
    const prevPath = history.location.state.prevPath;
    if (
      (prevPath === '/signin' || prevPath === '/') &&
      toJS(user.user).areas.length > 0
    ) {
      goToMain();
    }
    setNickname(toJS(user.user).nickname);
  }, [history]);

  const handleClick = (chip) => {
    if (chip.state === 'unselected') {
      if (selectedChipData.length < 3) {
        const newChipData = chipData.map((item) => {
          if (item.key === chip.key) {
            item.state = 'selected';
          }
          return item;
        });
        setChipData(newChipData);
        handleSelectedChipData();
      } else {
        setSelectedBoxrColor('red');
        setTimeout(() => {
          setSelectedBoxrColor('default');
        }, 500);
      }
    } else {
      handleDelete(chip);
    }
  };

  const handleDelete = (chip) => {
    const newChipData = chipData.map((item) => {
      if (item.key === chip.key) {
        item.state = 'unselected';
      }
      return item;
    });
    setChipData(newChipData);
    handleSelectedChipData();
  };

  const handleSelectedChipData = () => {
    const newSelectedChipData = chipData.filter(
      (item) => item.state === 'selected',
    );
    setSelecetedChipData(newSelectedChipData);
  };

  const handleInterestSubmit = () => {
    const selectedAreas = selectedChipData.map((item) => item.label);
    const data = {
      areas: [...selectedAreas],
    };

    user.setInterestArea(data).then((res) => {
      history.push('/main');
    });
  };

  const goToMain = () => {
    history.push('/main');
  };

  return (
    <Container>
      <div className={classes.root}>
        <Typography className={classes.intro} variant="h5">
          안녕하세요, {nickname}!<br />
          어디를 소개해드릴까요?
        </Typography>
        <div className={classes.selectedBox}>
          {selectedChipData.map((interestedPlace) => (
            <SelectedAreaChip
              key={interestedPlace.key}
              place={interestedPlace}
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
            <AreaChip key={place.key} place={place} onClick={handleClick} />
          ))}
        </div>
      </div>
      <>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleInterestSubmit}
        >
          등록
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={goToMain}
        >
          취소
        </Button>
      </>
    </Container>
  );
});

export default Interest;
