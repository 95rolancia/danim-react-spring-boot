import React from 'react';
import { observer } from 'mobx-react-lite';
import useUser from '../../../../hooks/useUser';
import styles from './profile-button.module.css';
import { Button } from '@material-ui/core';

const ProfileButton = observer(
  ({ isManager, userInfo, handleFollow, history }) => {
    const user = useUser();

    const goToProfileEdit = () => {
      history.push('/main/account/edit');
    };

    const follow = (e) => {
      e.preventDefault();
      user.follow({ nickname: userInfo.nickname }).then((res) => {
        if (res === 'exist') alert('이미 팔로우를 하셨습니다.');
        handleFollow();
      });
    };

    const unfollow = (e) => {
      e.preventDefault();
      user.unfollow({ nickname: userInfo.nickname }).then((res) => {
        handleFollow();
      });
    };

    return (
      <>
        {isManager ? (
          <Button
            variant="outlined"
            className={styles.editBtn}
            onClick={goToProfileEdit}
          >
            프로필 편집
          </Button>
        ) : userInfo.isFollow ? (
          <Button variant="outlined" onClick={unfollow}>
            구독 취소
          </Button>
        ) : (
          <Button variant="outlined" onClick={follow}>
            구독 하기
          </Button>
        )}
      </>
    );
  },
);

export default ProfileButton;
