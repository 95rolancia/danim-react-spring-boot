import React, { useState } from 'react';
import {
  Header,
  Profile,
  Introduce,
  Stories,
  Setting,
  FollowList,
} from './components';
import { useHistory } from 'react-router-dom';
import styles from './my-page.module.css';
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  introduce: {
    textAlign: 'center',
  },
  marginBottom: {
    height: theme.spacing(8),
  },
}));

const MyPage = ({ userInfo, isManager, handleFollow, handleStory }) => {
  const classes = useStyles();
  const [isShowSetting, setIsShowSetting] = useState(false);
  const history = useHistory();
  const showSetting = () => {
    setIsShowSetting(true);
  };

  const hideSetting = () => {
    setIsShowSetting(false);
  };

  return (
    <div className={styles.mypage}>
      <Setting
        isShowSetting={isShowSetting}
        hideSetting={hideSetting}
        history={history}
        user={userInfo}
      />
      <Header
        showSetting={showSetting}
        isManager={isManager}
        userInfo={userInfo}
      />
      <Profile
        isManager={isManager}
        userInfo={userInfo}
        handleFollow={handleFollow}
        history={history}
      />
      <Introduce introduce={userInfo.introduce} />
      <Divider />
      <FollowList userInfo={userInfo} />

      <Divider />
      <Stories
        stories={userInfo.stories}
        handleStory={handleStory}
        isManager={isManager}
      />
      <div className={classes.marginBottom}></div>
    </div>
  );
};

export default MyPage;
