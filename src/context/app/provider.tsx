
import React, { useState } from 'react';
import { AppContext } from './context';
import { initialProjects, initialPosts, initialStories } from './initialData';
import { User, Project, Post, Story } from '../../types';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [stories, setStories] = useState<Story[]>(initialStories);
  
  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };
  
  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };
  
  const addStory = (story: Story) => {
    setStories(prev => [story, ...prev]);
  };
  
  const value = {
    currentUser,
    projects,
    posts,
    stories,
    isLoggedIn,
    setIsLoggedIn,
    setCurrentUser,
    addProject,
    addPost,
    addStory,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
