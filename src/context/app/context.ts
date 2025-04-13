
import { createContext } from 'react';
import { AppContextType } from './types';

// Default context values
const defaultContext: AppContextType = {
  currentUser: null,
  projects: [],
  posts: [],
  stories: [],
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setCurrentUser: () => {},
  addProject: () => {},
  addPost: () => {},
  addStory: () => {},
};

// Create the context
export const AppContext = createContext<AppContextType>(defaultContext);
