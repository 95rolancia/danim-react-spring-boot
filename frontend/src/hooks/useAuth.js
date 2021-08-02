import { useContext } from 'react';
import { AuthContext } from '../stores';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
