import React from 'react';
import { StoryDay } from './index';

const StoryContents = ({
  imgBaseURL,
  photos,
  nickname,
  tripDate,
  tripAddress,
}) => {
  return (
    <>
      <div>나는 스토리 컨텐츠</div>
      <div>
        {tripDate.map((date) => (
          <StoryDay
            date={date}
            key={date}
            photos={photos.filter((photo) => photo.date.slice(0, 10) === date)}
            nickname={nickname}
            imgBaseURL={imgBaseURL}
            tripAddress={tripAddress}
          />
        ))}
      </div>
    </>
  );
};

export default StoryContents;
