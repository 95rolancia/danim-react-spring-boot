import React from 'react';
import { StoryDay } from './index';

const StoryContents = ({ boardCreate }) => {
  return (
    <>
      <div>
        {boardCreate.tripDate.map((date) => (
          <StoryDay
            boardCreate={boardCreate}
            date={date}
            key={date}
            photos={boardCreate.photos.filter(
              (photo) => photo.date.slice(0, 10) === date,
            )}
          />
        ))}
      </div>
    </>
  );
};

export default StoryContents;
