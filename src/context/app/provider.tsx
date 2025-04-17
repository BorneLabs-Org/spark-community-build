
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
        console.log('Loading initial data...');
        
        // Check for current user
        const user = await api.getCurrentUser();
        if (user) {
          console.log('Current user found:', user.username);
          setCurrentUser(user);
          setIsLoggedIn(true);
        } else {
          console.log('No current user found');
        }
        
        // Load projects, posts, stories, papers
        console.log('Loading data from APIs...');
        const projects = await api.getProjects();
        const posts = await api.getPosts();
        const stories = await api.getStories();
        const papers = await api.getPapers();
        
        console.log(`Loaded ${projects.length} projects, ${posts.length} posts, ${stories.length} stories, ${papers.length} papers`);
        
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
  
  // Reload data when user logs in or out
  useEffect(() => {
    if (isLoggedIn) {
      const reloadData = async () => {
        try {
          console.log('Reloading data after auth change...');
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
          console.error('Error reloading data:', error);
        }
      };
      
      reloadData();
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
