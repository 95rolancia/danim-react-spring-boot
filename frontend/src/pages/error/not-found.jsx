import { makeStyles } from '@material-ui/styles';
import React from 'react';
import SubHeader from '../../components/header/sub-header';
import { Box, Container, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '8em',
  },
  title: {
    fontFamily: 'MingukBold',
  },
}));
const NotFound = () => {
  const classes = useStyles();
  return (
    <>
      <SubHeader />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img className={classes.image} src="/images/danierror.png" alt="" />
          <Box component="span" m={1}></Box>
          <Typography color="primary" variant="h5" className={classes.title}>
            이런! 존재하지 않는 페이지입니다.
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
