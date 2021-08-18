import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { MyPage } from '../pages';
import NotUserExist from '../pages/error/not-user-exist';
import useUser from '../hooks/useUser';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MyPageRoute = observer(({ children, ...rest }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const user = useUser();

  useEffect(() => {
    const nickname = rest.computedMatch.params.nickname;
    user.getUserInfo(nickname).then((userInfo) => {
      if (userInfo) {
        setUserInfo(userInfo);
        if (toJS(user.user).nickname === userInfo.nickname) {
          setIsManager(true);
        }
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });
  }, [rest.computedMatch.params.nickname, user]);

  const handleFollow = () => {
    setUserInfo({ ...userInfo, isFollow: !userInfo.isFollow });
    const nickname = rest.computedMatch.params.nickname;
    user.getUserInfo(nickname).then((userInfo) => {
      if (userInfo) {
        setUserInfo(userInfo);
      }
    });
  };

  const onDelete = () => {
    const nickname = rest.computedMatch.params.nickname;
    user.getUserInfo(nickname).then((userInfo) => {
      if (userInfo) {
        setUserInfo(userInfo);
      }
    });
  };

  if (loading)
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <Route
      userInfo={userInfo}
      render={() =>
        userInfo ? (
          <MyPage
            userInfo={userInfo}
            isManager={isManager}
            handleFollow={handleFollow}
            onDelete={onDelete}
          />
        ) : (
          <NotUserExist />
        )
      }
    />
  );
});

export default MyPageRoute;
