import React from 'react';
import useBoardCreate from '../../../hooks/useBoardCreate';
import { observer } from 'mobx-react-lite';
import { StoryDay } from './index';
import { toJS } from 'mobx';

const StoryContents = observer((props) => {
  const boardCreate = useBoardCreate();
  return (
    <>
      <div>
        {boardCreate.tripDate.map((date) => (
          <StoryDay
            date={date}
            key={date}
            photos={toJS(boardCreate.photos).filter(
              (photo) => photo.date.slice(0, 10) === date,
            )}
          />
        ))}
      </div>
    </>
  );
});

export default StoryContents;
