import React from 'react';
import { useHistory } from 'react-router-dom';
import Stories from 'react-insta-stories';
import Header from './components/header';
import { mergeClasses } from '@material-ui/styles';
const StoryRead = ({ title, datas, no }) => {
  const history = useHistory();

  return (
    <>
      <Header title={title} num={no} />
      <Stories
        stories={datas}
        defaultInterval={8000}
        width={'100%'}
        height={'92%'}
        onAllStoriesEnd={(s, st) => history.push('/detail/' + no)}
      />
    </>
  );
};

export default StoryRead;
