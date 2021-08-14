import React, { createContext } from 'react';
import authStore from './auth-store';
import userStore from './user-store';
import searchStore from './search-store';
import boardCreateStore from './board-create-store';

export const AuthContext = createContext();
export const UserContext = createContext();
export const SearchContext = createContext();
export const BoardCreateContext = createContext();

const ProviderStores = ({ children }) => {
  return (
    <AuthContext.Provider value={authStore}>
      <UserContext.Provider value={userStore}>
        <SearchContext.Provider value={searchStore}>
          {children}
        </SearchContext.Provider>
        <BoardCreateContext.Provider value={boardCreateStore}>
          {children}
        </BoardCreateContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default ProviderStores;
