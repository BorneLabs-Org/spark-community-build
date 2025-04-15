
import React, { useState } from 'react';
import { AppContext } from './context';
import { users, projects, posts, stories, papers } from './initialData';
import { User, Paper, Project, Post, Story } from '@/types';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [postsList, setPostsList] = useState<Post[]>(posts);
  const [storiesList, setStoriesList] = useState<Story[]>(stories);
  const [papersList, setPapersList] = useState<Paper[]>(papers);
  
  const addPaper = (paper: Paper) => {
    setPapersList(prevPapers => [paper, ...prevPapers]);
  };
  
  const addProject = (project: Project) => {
    setProjectsList(prevProjects => [project, ...prevProjects]);
  };

  const addPost = (post: Post) => {
    setPostsList(prevPosts => [post, ...prevPosts]);
  };

  const addStory = (story: Story) => {
    setStoriesList(prevStories => [story, ...prevStories]);
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
        projects: projectsList,
        posts: postsList,
        stories: storiesList,
        papers: papersList,
        addPaper,
        addProject,
        addPost,
        addStory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
