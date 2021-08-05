import React from 'react';
import useUser from '../../hooks/useUser';

const Bookmark = (props) => {
  const user = useUser();
  const test = () => {
    user.getUser().then(console.log);
  };
  return (
    <>
      <button onClick={test}>test</button>
    </>
  );
};

export default Bookmark;
