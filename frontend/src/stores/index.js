import React, { createContext } from 'react';
import authStore from './auth-store';
import userStore from './user-store';
import searchStore from './search-store';
import storyStore from './story-store';
import boardCreateStore from './board-create-store';

export const AuthContext = createContext();
export const UserContext = createContext();
export const SearchContext = createContext();
export const StoryContext = createContext();
export const BoardCreateContext = createContext();

const ProviderStores = ({ children }) => {
  return (
    <AuthContext.Provider value={authStore}>
      <UserContext.Provider value={userStore}>
        <SearchContext.Provider value={searchStore}>
          <StoryContext.Provider value={storyStore}>
            <BoardCreateContext.Provider value={boardCreateStore}>
              {children}
            </BoardCreateContext.Provider>
          </StoryContext.Provider>
        </SearchContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default ProviderStores;
