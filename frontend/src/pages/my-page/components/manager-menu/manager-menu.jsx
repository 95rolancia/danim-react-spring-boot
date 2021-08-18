import React, { useState } from 'react';
import useStory from '../../../../hooks/useStory';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Menu,
  MenuItem,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: '#667580',
  },
}));

const ManagerMenu = ({ storyNo, onDelete }) => {
  const classes = useStyles();
  const story = useStory();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStory = (type, storyNo) => {
    if (type === 'delete') {
      handleDialogOpen();
    }
  };

  const handleDeleteStory = () => {
    story.deleteStory(storyNo).then((res) => {
      handleDialogClose();
      onDelete();
    });
  };

  const goToUpdateStoryPage = () => {
    history.push({ pathname: '/main/create', state: { storyNo: storyNo } });
  };

  return (
    <>
      <MoreVert className={classes.icon} onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
      >
        <MenuItem
          onClick={(e) => {
            handleClose(e);
            goToUpdateStoryPage();
          }}
        >
          수정
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose(e);
            handleStory('delete', storyNo);
          }}
        >
          삭제
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'정말 스토리를 삭제하시겠습니까?'}
        </DialogTitle>
        <DialogContent id="alert-dialog-description">
          삭제된 스토리는 다시 복구할 수 없습니다.
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => handleDeleteStory(storyNo)}>
            삭제
          </Button>
          <Button color="primary" onClick={handleDialogClose} autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManagerMenu;
