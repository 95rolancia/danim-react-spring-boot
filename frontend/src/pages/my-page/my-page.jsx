import React, { useState } from 'react';
import { Header, Profile, Introduce, Stories, Setting } from './components';
import { useHistory } from 'react-router-dom';
import styles from './my-page.module.css';

const MyPage = ({ userInfo, isManager }) => {
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
      <Profile isManager={isManager} userInfo={userInfo} />
      <Introduce />
      <Stories stories={userInfo.stories} />
    </div>
  );
};

export default MyPage;
