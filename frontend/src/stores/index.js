import React, { createContext } from 'react';
import authStore from './auth-store';

export const authContext = createContext();

const ProviderStores = ({ children }) => {
  return (
    <authContext.Provider value={authStore}>{children}</authContext.Provider>
  );
};

export default ProviderStores;
