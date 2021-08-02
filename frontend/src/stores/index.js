import React, { createContext } from 'react';
import authStore from './auth-store';
import userStore from './user-store';

export const AuthContext = createContext();
export const UserContext = createContext();

const ProviderStores = ({ children }) => {
  return (
    <AuthContext.Provider value={authStore}>
      <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default ProviderStores;
