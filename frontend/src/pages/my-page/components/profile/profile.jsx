import React from 'react';
import styles from './profile.module.css';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import ProfileButton from '../profile-button/profile-button';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  title: {
    fontFamily: 'MingukBold',
    marginBottom: theme.spacing(1),
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
        <Typography variant="h5" className={classes.title}>
          {userInfo.nickname}
        </Typography>
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
