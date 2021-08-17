import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { Room, DoubleArrow } from '@material-ui/icons';
import { HomeRoot, HomePic, MainHeader } from './components';
import useUser from '../../hooks/useUser';
import useMainPage from '../../hooks/useMainPage';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
const datasPic = [
  {
    no: '1111',
    picNo: '1',
    pic: 'https://picsum.photos/id/1080/500',
    tag: 'FOOD',
  },
  {
    no: '1111',
    picNo: '2',
    pic: 'https://picsum.photos/id/1013/500',
    tag: 'PERSON',
  },
  {
    no: '1112',
    picNo: '3',
    pic: 'https://picsum.photos/id/1002/500',
    tag: 'SCENERY',
  },
  {
    no: '1112',
    picNo: '5',
    pic: 'https://picsum.photos/id/139/500',
    tag: 'FOOD',
  },
  {
    no: '1112',
    picNo: '4',
    pic: 'https://picsum.photos/id/1005/500',
    tag: 'PERSON',
  },
];
const options = ['여행루트', '여행사진'];
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'MingukBold',
  },
  icon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: '#667580',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));
const Home = observer((props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [interestRegions, setInterestRegions] = useState(null);
  const [interestArray, setInterestArray] = useState([]);
  const [interestContents, setInterestContents] = useState([]);
  const [popularContents, setPopularContents] = useState([]);
  const history = useHistory();
  const user = useUser();
  const mainContents = useMainPage();

  const [menu, setMenu] = useState(null);
  const [selectOptionIndex, setSelectOptionIndex] = useState(0);
  const [selectOptionValue, setSelectOptionValue] = useState('여행루트');
  const goToInterestModify = () => {
    history.push({
      pathname: '/interest',
      state: { prevPath: history.location.pathname },
    });
  };

  const openMenu = (e) => {
    setMenu(e.currentTarget);
  };

  const handleClose = (e) => {
    setMenu(null);
  };

  const handleMenuItem = (e, index) => {
    setSelectOptionIndex(index);
    setSelectOptionValue(options[index]);
    setMenu(null);
  };

  useEffect(() => {
    const userInterestArray = toJS(user.user).areas;
    mainContents.getMyInterestsStory().then((res) => {
      if (res) {
        setInterestContents(res);
        setInterestArray(userInterestArray);
        let userInterest = '';
        for (let interest of userInterestArray) {
          userInterest += interest;
        }
        setInterestRegions(userInterest);
        mainContents.getPopularStory().then((res) => {
          if (res) {
            setPopularContents(res);
          }
        });
      }
      setLoading(false);
    });
    return () => {
      setLoading(false);
    };
  }, [user.user, mainContents]);

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  return (
    <>
      <MainHeader />
      <Box component="span" m={1}></Box>
      <div>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Room color="primary" />}
          onClick={goToInterestModify}
        >
          <Typography variant="h5" component="span" className={classes.title}>
            {interestRegions}
          </Typography>
        </Button>
        <DoubleArrow className={classes.icon} />
        <Button
          variant="outlined"
          color="secondary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openMenu}
        >
          <Typography variant="h5" component="span" className={classes.title}>
            #{selectOptionValue}
          </Typography>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              onClick={(e) => handleMenuItem(e, index)}
              selected={index === selectOptionIndex}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <Box component="span" m={1}></Box>
      {selectOptionValue === '여행루트' ? (
        <HomeRoot
          popularContents={popularContents}
          interests={interestArray}
          contents={interestContents}
        />
      ) : (
        <HomePic datas={datasPic} />
      )}
    </>
  );
});

export default Home;
