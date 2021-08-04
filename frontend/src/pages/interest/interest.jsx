import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import PlaceChip from './place-chip';
import SelectedChip from './selected-chip';
import {
  Container,
  Button,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import useUser from '../../hooks/useUser';
import { toJS } from 'mobx';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  intro: {
    marginTop: theme.spacing(3),
  },
  selected_box: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    height: '40px',
  },
  divider: {
    backgroundColor: 'blue',
    height: '3px',
  },
  dividerRed: {
    backgroundColor: 'red',
    height: '3px',
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
    user.getUser().then((res) => {
      if (!res) {
        alert('사용자 정보 조회 실패!');
        return;
      }

      if (toJS(user.user).interests.length) {
        history.push('/main');
      } else {
        setNickname(toJS(user.user).nickname);
      }
    });
  });

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
      userno: toJS(user.user).userno,
      areas: [...selectedAreas],
    };
    console.log(data);
    user.setInterestArea(data).then((res) => {
      if (res) {
        history.push('/main');
      } else {
        alert('관심 지역 설정에 문제가 생겼습니다...! 헐');
      }
    });
  };

  return (
    <Container>
      <div className={classes.root}>
        <Typography className={classes.intro} variant="h5">
          안녕하세요, {nickname}!<br />
          어디를 소개해드릴까요?
        </Typography>
        <div className={classes.selected_box}>
          {selectedChipData.map((interestedPlace) => (
            <SelectedChip
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
            <PlaceChip key={place.key} place={place} onClick={handleClick} />
          ))}
        </div>
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleInterestSubmit}
      >
        완료
      </Button>
    </Container>
  );
});

export default Interest;
