import { useContext } from 'react';
import { authContext } from '../stores';

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
