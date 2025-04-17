
import React, { useState, useEffect } from 'react';
import { AppContext } from './context';
import { User, Paper, Project, Post, Story } from '@/types';
import * as api from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

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
      console.log('Loading initial data from Supabase...');
      
      // Fetch data in parallel with better error handling
      const [projects, posts, stories, papers] = await Promise.all([
        api.getProjects().catch(err => {
          console.error('Failed to load projects:', err);
          return [];
        }),
        api.getPosts().catch(err => {
          console.error('Failed to load posts:', err);
          return [];
        }),
        api.getStories().catch(err => {
          console.error('Failed to load stories:', err);
          return [];
        }),
        api.getPapers().catch(err => {
          console.error('Failed to load papers:', err);
          return [];
        })
      ]);
      
      console.log(`Loaded from Supabase: 
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
      console.error('Error loading data from Supabase:', error);
      toast({
        title: "Data loading error",
        description: "There was a problem connecting to the database. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data load - run once on mount
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
    try {
      // First, add to Supabase
      const { data, error } = await supabase
        .from('papers')
        .insert({
          title: paper.title,
          description: paper.description,
          file_url: paper.fileUrl,
          file_type: paper.fileType,
          cover_image: paper.coverImage,
          user_id: currentUser?.id
        })
        .select('*')
        .single();
        
      if (error) throw error;
      
      // Then update local state
      setPapersList(prevPapers => [paper, ...prevPapers]);
      return true;
    } catch (error) {
      console.error('Error adding paper:', error);
      return false;
    }
  };
  
  const addProject = async (project: Project) => {
    try {
      // First, add to Supabase
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: project.name,
          description: project.description,
          image_url: project.image,
          sas_level: project.sasLevel,
          user_id: currentUser?.id
        })
        .select('*')
        .single();
        
      if (error) throw error;
      
      // Then update local state
      setProjectsList(prevProjects => [project, ...prevProjects]);
      return true;
    } catch (error) {
      console.error('Error adding project:', error);
      return false;
    }
  };

  const addPost = async (post: Post) => {
    try {
      // First, add to Supabase
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: post.title,
          description: post.description,
          media_url: post.media,
          media_type: post.mediaType,
          user_id: currentUser?.id
        })
        .select('*')
        .single();
        
      if (error) throw error;
      
      // Then update local state
      setPostsList(prevPosts => [post, ...prevPosts]);
      return true;
    } catch (error) {
      console.error('Error adding post:', error);
      return false;
    }
  };

  const addStory = async (story: Story) => {
    try {
      // First, add to Supabase
      const { data, error } = await supabase
        .from('stories')
        .insert({
          title: story.title,
          content: story.content,
          image_url: story.image,
          user_id: currentUser?.id,
          project_id: story.project?.id
        })
        .select('*')
        .single();
        
      if (error) throw error;
      
      // Then update local state
      setStoriesList(prevStories => [story, ...prevStories]);
      return true;
    } catch (error) {
      console.error('Error adding story:', error);
      return false;
    }
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
