import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import { StoryItem } from '..';
import { List } from '@material-ui/core';

const StoryList = observer(() => {
  const search = useSearch();
  return (
    <List>
      {toJS(search.searchedStory).map((story) => (
        <StoryItem story={story} key={story.storyNo} />
      ))}
    </List>
  );
});

export default StoryList;
