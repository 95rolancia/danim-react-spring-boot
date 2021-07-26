import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = (props) => {
  const history = useHistory();
  return (
    <nav>
      <button
      onClick={() => {
        history.push('/main');
      }}>
        Main
      </button>
      <button
      onClick={() => {
        history.push('/search');
      }}>
        Search
      </button>
      <button
      onClick={() => {
        history.push('/trip');
      }}>
        Trip
      </button>
      <button
      onClick={() => {
        history.push('/bookmark');
      }}>
        Bookmark
      </button>
      <button
      onClick={() => {
        history.push('/profile');
      }}>
        Profile
      </button>
    </nav>
  );
}

export default Navbar;