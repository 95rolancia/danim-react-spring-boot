import { observer } from 'mobx-react-lite';
import useBoardCreate from '../../../hooks/useBoardCreate';
import React from 'react';
import {
  makeStyles,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  Slide,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    position: 'absolute',
    left: '45%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {},
  imageListItem: {
    overflow: 'hidden',
  },
  section: {
    margin: '1em',
  },
  submit_button: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    color: 'whitesmoke',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CoverImageChange = observer(({ isShowSetting, hideSetting }) => {
  const boardCreate = useBoardCreate();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const photoURL = boardCreate.imgBaseURL + boardCreate.nickname + '/';

  const changeThumbnail = (e) => {
    console.log(e.target.alt);
    boardCreate.changeThumbnail(e.target.alt);
    hideSetting();
  };

  return (
    <Dialog
      className={classes.root}
      fullScreen={fullScreen}
      open={isShowSetting}
      onClose={hideSetting}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={hideSetting}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            표지 사진 선택
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.section}>
        <div className={classes.root}>
          <ImageList className={classes.imageList}>
            {boardCreate.photos.map((item) => (
              <ImageListItem
                key={item.filename}
                className={classes.imageListItem}
              >
                <img
                  src={photoURL + item.filename}
                  alt={item.filename}
                  onClick={changeThumbnail}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      </div>
    </Dialog>
  );
});

export default CoverImageChange;
