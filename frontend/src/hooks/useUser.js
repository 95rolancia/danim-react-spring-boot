import { useContext } from 'react';
import { UserContext } from '../stores';

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
