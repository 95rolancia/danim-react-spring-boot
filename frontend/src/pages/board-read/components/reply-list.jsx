import React from 'react';
import useStory from '../../../hooks/useStory';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {});
const ReplyList = ({ datas, handleComment, no }) => {
  const classes = useStyles();
  const story = useStory();
  const history = useHistory();

  const deleteComment = (commentNo) => {
    story.deleteComment({ commentNo, storyNo: no }).then((res) => {
      handleComment();
    });
  };

  const goToUserPage = (nickname) => {
    history.push('/main/' + nickname);
  };
  return (
    <List>
      {!datas.length ? (
        <ListItem>
          <ListItemText>
            <Typography variant="button">등록된 댓글이 없습니다.</Typography>
          </ListItemText>
        </ListItem>
      ) : (
        <>
          {datas.map((data) => (
            <ListItem key={data.commentNo}>
              <ListItemAvatar>
                <Avatar
                  alt="유저 사진"
                  src={
                    process.env.REACT_APP_IMAGE_BASE_URL +
                    data.nickname +
                    '/' +
                    data.profile
                  }
                  onClick={() => goToUserPage(data.nickname)}
                />
              </ListItemAvatar>
              <ListItemText primary={data.nickname} secondary={data.content} />
              {data.mine === true ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => deleteComment(data.commentNo)}
                >
                  삭제
                </Button>
              ) : (
                <></>
              )}
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
};

export default ReplyList;
