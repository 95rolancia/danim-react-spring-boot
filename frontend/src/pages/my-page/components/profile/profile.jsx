import React from 'react';
import styles from './profile.module.css';
import { Avatar, makeStyles } from '@material-ui/core';
import ProfileButton from '../profile-button/profile-button';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const Profile = ({ isManager, userInfo, handleFollow, history }) => {
  const classes = useStyles();

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <Avatar
          className={classes.avatar}
          alt={userInfo.nickname}
          src={
            process.env.REACT_APP_IMAGE_BASE_URL +
            userInfo.nickname +
            '/' +
            userInfo.profile
          }
        />
      </div>
      <div className={styles.right}>
        <h1 className="nickname">{userInfo.nickname}</h1>
        <ProfileButton
          isManager={isManager}
          userInfo={userInfo}
          handleFollow={handleFollow}
          history={history}
        />
      </div>
    </div>
  );
};

export default Profile;
