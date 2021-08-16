import React, { createContext } from 'react';
import authStore from './auth-store';
import userStore from './user-store';
import searchStore from './search-store';
import storyStore from './story-store';
import planStore from './plan-store';

export const AuthContext = createContext();
export const UserContext = createContext();
export const SearchContext = createContext();
export const StoryContext = createContext();
export const PlanContext = createContext();

const ProviderStores = ({ children }) => {
  return (
    <AuthContext.Provider value={authStore}>
      <UserContext.Provider value={userStore}>
        <SearchContext.Provider value={searchStore}>
          <StoryContext.Provider value={storyStore}>
            <PlanContext.Provider value={planStore}>
              {children}
            </PlanContext.Provider>
          </StoryContext.Provider>
        </SearchContext.Provider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default ProviderStores;
