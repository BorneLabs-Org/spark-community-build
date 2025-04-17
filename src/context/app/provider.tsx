
import React, { useState, useEffect } from 'react';
import { AppContext } from './context';
import { User, Paper, Project, Post, Story } from '@/types';
import * as api from '@/lib/api';
import { supabase } from '@/lib/supabase';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [storiesList, setStoriesList] = useState<Story[]>([]);
  const [papersList, setPapersList] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Comprehensive data loading function
  const loadData = async () => {
    setIsLoading(true);
    try {
      console.log('Loading initial data...');
      
      // Fetch data in parallel
      const [projects, posts, stories, papers] = await Promise.all([
        api.getProjects(),
        api.getPosts(),
        api.getStories(),
        api.getPapers()
      ]);
      
      console.log(`Loaded: 
        ${projects.length} projects, 
        ${posts.length} posts, 
        ${stories.length} stories, 
        ${papers.length} papers`);
      
      // Update state with fetched data
      setProjectsList(projects);
      setPostsList(posts);
      setStoriesList(stories);
      setPapersList(papers);
    } catch (error) {
      console.error('Error loading data:', error);
      // Optionally show a toast or error message
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data load
  useEffect(() => {
    loadData();
  }, []);
  
  // Reload data when login state changes
  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);
  
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
