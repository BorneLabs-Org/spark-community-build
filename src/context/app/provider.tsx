
import React, { useState } from 'react';
import { AppContext } from './context';
import { users, projects, posts, stories, papers } from './initialData';
import { User, Paper } from '@/types';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [papersList, setPapersList] = useState<Paper[]>(papers);
  
  const addPaper = (paper: Paper) => {
    setPapersList(prevPapers => [paper, ...prevPapers]);
  };
  
  // Initialize the context with sample data if the user is not logged in
  React.useEffect(() => {
    if (!isLoggedIn && users.length > 0) {
      setCurrentUser(users[0]);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);
  
  return (
    <AppContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        setIsLoggedIn,
        setCurrentUser,
        projects,
        posts,
        stories,
        papers: papersList,
        addPaper,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
