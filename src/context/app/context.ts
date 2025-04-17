
import { createContext } from 'react';
import { AppContextType } from './types';

// Default context values
const defaultContext: AppContextType = {
  currentUser: null,
  projects: [],
  posts: [],
  stories: [],
  papers: [],
  isLoggedIn: false,
  isLoading: false,
  setIsLoggedIn: () => {},
  setCurrentUser: () => {},
  addProject: async () => false,
  addPost: async () => false,
  addStory: async () => false,
  addPaper: async () => false,
  deleteProject: async () => false,
  deletePost: async () => false,
  deleteStory: async () => false,
  deletePaper: async () => false
};

// Create the context
export const AppContext = createContext<AppContextType>(defaultContext);
