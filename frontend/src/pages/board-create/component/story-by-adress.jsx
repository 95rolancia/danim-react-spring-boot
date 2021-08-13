import React, { useState, useEffect } from 'react';
import { StoryThumbnail } from './index';

const StoryByAdress = ({ imgBaseURL, photos, nickname, address }) => {
  const [isPhoto, setIsPhoto] = useState(false);

  useEffect(() => {
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].address === address) {
        setIsPhoto(true);
      }
    }
  }, [photos, address]);

  return (
    <>
      {isPhoto && (
        <>
          <div>{address}</div>
          <div>
            {photos.map((photo) => (
              <StoryThumbnail
                key={address}
                photo={photo}
                nickname={nickname}
                imgBaseURL={imgBaseURL}
              />
            ))}
          </div>
        </>
      )}
      {/* <div>
        {photos.map((photo) => (
          <StoryThumbnail
            key={photo.key}
            photo={photo}
            nickname={nickname}
            imgBaseURL={imgBaseURL}
            tripAdress={address}
          />
        ))}
      </div> */}
    </>
  );
};

export default StoryByAdress;
