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
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
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

const itemData = [
  {
    img: 'https://picsum.photos/300/300',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://picsum.photos/300/300',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://picsum.photos/300/300',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://picsum.photos/300/300',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://picsum.photos/300/300',
    title: 'Image',
    author: 'author',
  },
];

const BoardPlaceMemo = ({
  isShowSetting,
  hideSetting,
  address,
  onMemoChange,
  photos,
  boardCreate,
}) => {
  const classes = useStyles();

  const photoURL = boardCreate.imgBaseURL + boardCreate.nickname + '/';

  const handleMemoChange = (e) => {
    onMemoChange(e);
  };

  return (
    <Dialog
      className={classes.root}
      fullScreen
      open={isShowSetting}
      onClose={hideSetting}
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
            {address}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.section}>
        <div className={classes.root}>
          <ImageList className={classes.imageList} cols={5}>
            {photos.map((item) => (
              <ImageListItem key={item.filename}>
                <img src={photoURL + item.filename} alt={item.address} />
              </ImageListItem>
            ))}
          </ImageList>
        </div>

        <form>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            multiline
            variant="outlined"
            placeholder="메모해주세요~!"
            type="textarea"
            onChange={handleMemoChange}
          />
          <Button
            className={classes.submit_button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={hideSetting}
          >
            메모하기
          </Button>
        </form>
      </div>
    </Dialog>
  );
};

export default BoardPlaceMemo;
