import React from 'react';
import ContentLoader from 'react-content-loader';

const SearchContentLoader = (props) => {
  return (
    <ContentLoader
      width={500}
      height={500}
      style={{ width: '100%' }}
      {...props}
    >
      <circle cx="44" cy="42" r="22" />
      <rect x="100" y="30" rx="3" ry="3" width="150" height="7" />
      <rect x="100" y="48" rx="3" ry="3" width="100" height="6" />

      <circle cx="44" cy="115" r="22" />
      <rect x="100" y="103" rx="3" ry="3" width="150" height="6" />
      <rect x="100" y="121" rx="3" ry="3" width="100" height="7" />

      <circle cx="44" cy="188" r="22" />
      <rect x="100" y="176" rx="3" ry="3" width="150" height="7" />
      <rect x="100" y="194" rx="3" ry="3" width="100" height="6" />
    </ContentLoader>
  );
};

export default SearchContentLoader;
