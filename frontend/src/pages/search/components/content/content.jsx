import React from 'react';
import { observer } from 'mobx-react-lite';
import useSearch from '../../../../hooks/useSearch';
import UserContent from '../user-content/user-content';
import StoryContent from '../story-content/story-content';

const Content = observer(() => {
  const search = useSearch();

  if (search.searchType === 'User') {
    return <UserContent />;
  } else if (search.searchType === 'Story') {
    return <StoryContent />;
  }

  return (
    <section>
      {search.searchType === 'User' ? <UserContent /> : <StoryContent />}
    </section>
  );
});

export default Content;
