import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const Profile = ({ isManager, userInfo }) => {
  const classes = useStyles();
  const history = useHistory();
  const goToProfileEdit = () => {
    history.push('/main/account/edit');
  };
  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <Avatar
          className={classes.avatar}
          alt={userInfo.nickname}
          src={userInfo.profile}
        />
      </div>
      <div className={styles.right}>
        <h1 className="nickname">{userInfo.nickname}</h1>
        {isManager ? (
          <button className={styles.editBtn} onClick={goToProfileEdit}>
            프로필 편집
          </button>
        ) : (
          <button>구독 하기</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
