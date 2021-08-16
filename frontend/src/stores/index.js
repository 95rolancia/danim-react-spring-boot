import React, { createContext } from 'react';
import authStore from './auth-store';
import userStore from './user-store';
import searchStore from './search-store';

export const AuthContext = createContext();
export const UserContext = createContext();
export const SearchContext = createContext();

const ProviderStores = ({ children }) => {
  return (
    <AuthContext.Provider value={authStore}>
      <UserContext.Provider value={userStore}>
        <SearchContext.Provider value={searchStore}>
          {children}
        </SearchContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default ProviderStores;
