import { useContext } from 'react';
import { UserContext } from '../stores';

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
