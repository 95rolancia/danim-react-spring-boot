import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { HomeRoot, HomePic, MainHeader } from './components';
import useUser from '../../hooks/useUser';
import useMainPage from '../../hooks/useMainPage';
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

const options = ['여행루트', '여행사진'];
const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'MingukBold',
    color: '#F5F5F5',
  },
  option: {
    fontFamily: 'MingukBold',
    textDecoration: 'underline',
  },
  desc: {
    fontFamily: 'MingukBold',
    color: '#36434C',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  root: {
    textAlign: 'center',
  },
  imgDaniBear: {
    width: '5em',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
const Home = observer((props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [interestRegions, setInterestRegions] = useState(null);
  const [interestContents, setInterestContents] = useState([]);
  const [interestPhotos, setInterestPhotos] = useState([]);
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
        let userInterest = '';
        for (let interest of userInterestArray) {
          userInterest += '#' + interest + ' ';
        }
        setInterestRegions(userInterest);
        mainContents.getPopularStory().then((res) => {
          if (res) {
            setPopularContents(res);
          }
        });
        mainContents.getMyInterestsPhoto().then((res) => {
          if (res) {
            setInterestPhotos(res);
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
      <div className={classes.root}>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={goToInterestModify}
          >
            <Typography variant="h6" component="span" className={classes.title}>
              {interestRegions}
            </Typography>
          </Button>
        </div>
        <div>
          <Button
            color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={openMenu}
          >
            <Typography
              variant="h6"
              component="span"
              className={classes.option}
            >
              {selectOptionValue}
            </Typography>
          </Button>
          <Typography variant="h6" component="span" className={classes.desc}>
            보여드릴게요.
          </Typography>
        </div>
      </div>
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
      <Box component="span" m={1}></Box>
      {selectOptionValue === '여행루트' ? (
        <HomeRoot
          popularContents={popularContents}
          contents={interestContents}
        />
      ) : (
        <HomePic datas={interestPhotos} />
      )}
    </>
  );
});

export default Home;
