import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { StoryDay } from './index';

const StoryContents = observer(() => {
  const boardCreate = useBoardCreate();
  return (
    <>
      {boardCreate.tripDate.map((date) => (
        <StoryDay
          date={date}
          key={date}
          photos={toJS(boardCreate.photos).filter(
            (photo) => photo.date.slice(0, 10) === date,
          )}
        />
      ))}
    </>
  );
});

export default StoryContents;
