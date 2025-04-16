
import React, { useState, useEffect } from 'react';
import { AppContext } from './context';
import { User, Paper, Project, Post, Story } from '@/types';
import * as api from '@/lib/api';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [storiesList, setStoriesList] = useState<Story[]>([]);
  const [papersList, setPapersList] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Check for current user
        const user = await api.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
        
        // Load projects, posts, stories, papers
        const [projects, posts, stories, papers] = await Promise.all([
          api.getProjects(),
          api.getPosts(),
          api.getStories(),
          api.getPapers()
        ]);
        
        setProjectsList(projects);
        setPostsList(posts);
        setStoriesList(stories);
        setPapersList(papers);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  const addPaper = async (paper: Paper) => {
    setPapersList(prevPapers => [paper, ...prevPapers]);
  };
  
  const addProject = async (project: Project) => {
    setProjectsList(prevProjects => [project, ...prevProjects]);
  };

  const addPost = async (post: Post) => {
    setPostsList(prevPosts => [post, ...prevPosts]);
  };

  const addStory = async (story: Story) => {
    setStoriesList(prevStories => [story, ...prevStories]);
  };
  
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
        addStory,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
