import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { WithSeeMore } from 'react-insta-stories';
import { makeStyles } from '@material-ui/styles';
import useStory from '../hooks/useStory';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { StoryRead } from '../pages';

const useStyle = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const StoryRoute = observer(({ children, ...rest }) => {
  const classes = useStyle();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [storyNum, setStoryNum] = useState(0);

  const [stories, setStories] = useState([]);
  const story = useStory();

  useEffect(() => {
    const no = rest.computedMatch.params.no;
    setStoryNum(no);
    story.getStory(no).then((res) => {
      if (res) {
        setTitle(res.title);
        const datas = [];
        datas.push({
          content: ({ action, isPaused, story }) => {
            return (
              <WithSeeMore story={story} action={action}>
                <div style={{ width: '100%', height: '100%' }}>
                  <img
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                    }}
                    src={
                      process.env.REACT_APP_IMAGE_BASE_URL +
                      res.nickname +
                      '/' +
                      res.thumbnail
                    }
                    alt="스토리 타이틀"
                  />
                </div>
              </WithSeeMore>
            );
          },
          seeMoreCollapsed: ({ toggleMore, action }) => (
            <div
              style={{
                width: '100%',
                boxShadow: '0px 0em 5em 5em white',
                backgroundColor: 'white',
                opacity: '0.5',
                textAlign: 'center',
                bottom: '0',
              }}
              onClick={() => toggleMore(true)}
            >
              <p
                style={{
                  fontFamily: 'MingukBold',
                  margin: '0',
                  fontSize: '2rem',
                }}
              >
                {res.nickname} 님의 <br />
              </p>
              <p
                style={{
                  fontSize: '3rem',
                  fontFamily: 'MingukBold',
                  margin: '0',
                  color: 'black',
                }}
              >
                {res.title}
              </p>
            </div>
          ),
          seeMore: ({ close }) => (
            <div
              style={{
                maxWidth: '100%',
                height: '100%',
                padding: 40,
                background: 'white',
                opacity: '0.5',
              }}
            >
              <h2>지역 : 아직없음</h2>
              <p style={{ textDecoration: 'underline' }} onClick={close}>
                {res.nickname}님 스토리로 돌아가기
              </p>
            </div>
          ),
        });

        for (let i = 0; i < res.substories.length; i++) {
          for (let j = 0; j < res.substories[i].photos.length; j++) {
            let data = {
              content: ({ action, isPaused, story }) => {
                return (
                  <WithSeeMore story={story} action={action}>
                    <div style={{ width: '100%', height: '100%' }}>
                      <img
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                        }}
                        src={
                          process.env.REACT_APP_IMAGE_BASE_URL +
                          res.nickname +
                          '/' +
                          res.substories[i].photos[j].filename
                        }
                        alt="스토리 내용 사진"
                      />
                    </div>
                  </WithSeeMore>
                );
              },
              seeMoreCollapsed: ({ toggleMore, action }) => (
                <div
                  style={{
                    width: '100%',
                    boxShadow: '0px 0em 5em 5em white',
                    backgroundColor: 'white',
                    opacity: '0.5',
                    textAlign: 'center',
                    bottom: '0',
                  }}
                  onClick={() => toggleMore(true)}
                >
                  <p style={{ fontFamily: 'MingukBold', fontSize: '2rem' }}>
                    {res.substories[i].photos[j].content}
                  </p>
                </div>
              ),
              seeMore: ({ close }) => (
                <div
                  style={{
                    maxWidth: '100%',
                    height: '100%',
                    padding: 40,
                    background: 'white',
                    opacity: '0.5',
                  }}
                >
                  <h2>
                    {res.substories[i].photos[j].address},
                    {res.substories[i].photos[j].placeName}
                  </h2>
                  <p style={{ textDecoration: 'underline' }} onClick={close}>
                    {res.nickname}님 스토리로 돌아가기
                  </p>
                </div>
              ),
            };
            datas.push(data);
          }
        }
        setStories(datas);
      }
      setLoading(false);
    });
  }, [rest.computedMatch.params.no, story]);

  if (loading)
    return (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  return (
    <Route
      render={() => <StoryRead title={title} datas={stories} no={storyNum} />}
    />
  );
});
export default StoryRoute;
