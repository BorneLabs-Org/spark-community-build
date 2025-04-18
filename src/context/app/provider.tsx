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
  
  const addPaper = async (paper: Omit<Paper, 'id' | 'createdAt' | 'downloads'>) => {
    try {
      console.log('Adding paper:', paper);
      // First, add to Supabase
      const newPaper = await api.addPaper(paper);
      
      // Then update local state
      setPapersList(prevPapers => [newPaper, ...prevPapers]);
      
      toast({
        title: "Success",
        description: "Paper published successfully"
      });
      
      return true;
    } catch (error) {
      console.error('Error adding paper:', error);
      toast({
        title: "Error",
        description: "Failed to publish paper",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      console.log('Adding project:', project);
      
      // First, add project to Supabase
      const newProject = await api.addProject(project);
      
      // Now send notification to all admin users
      try {
        // Get all admin users
        const { data: adminRoles } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'admin');
          
        if (adminRoles && adminRoles.length > 0) {
          console.log('Found admin users:', adminRoles);
          
          // Create notifications for each admin
          const notificationPromises = adminRoles.map(admin => {
            return supabase
              .from('notifications')
              .insert({
                to_user: admin.user_id,
                from_user: project.user.id,
                type: 'project_approval',
                related_project_id: newProject.id
              });
          });
          
          await Promise.all(notificationPromises);
          console.log('Admin notifications sent successfully');
        } else {
          console.log('No admin users found to notify');
        }
      } catch (notifyError) {
        console.error('Error notifying admins:', notifyError);
        // We don't throw here to avoid failing the project creation
      }
      
      // Then update local state
      setProjectsList(prevProjects => [newProject, ...prevProjects]);
      return true;
    } catch (error) {
      console.error('Error adding project:', error);
      return false;
    }
  };

  const addPost = async (post: Post) => {
    try {
      // First, add to Supabase
      const newPost = await api.addPost({
        title: post.title,
        description: post.description,
        media: post.media,
        mediaType: post.mediaType,
        user: post.user
      });
      
      // Then update local state
      setPostsList(prevPosts => [newPost, ...prevPosts]);
      return true;
    } catch (error) {
      console.error('Error adding post:', error);
      return false;
    }
  };

  const addStory = async (story: Story) => {
    try {
      // First, add to Supabase
      const newStory = await api.addStory({
        title: story.title,
        content: story.content,
        image: story.image,
        user: story.user,
        project: story.project
      });
      
      // Then update local state
      setStoriesList(prevStories => [newStory, ...prevStories]);
      return true;
    } catch (error) {
      console.error('Error adding story:', error);
      return false;
    }
  };

  // Delete functions
  const deleteProject = async (projectId: string) => {
    try {
      await api.deleteProject(projectId);
      setProjectsList(prevProjects => prevProjects.filter(project => project.id !== projectId));
      toast({
        title: "Project deleted",
        description: "The project has been successfully removed.",
      });
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting the project.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const deletePost = async (postId: string) => {
    try {
      await api.deletePost(postId);
      setPostsList(prevPosts => prevPosts.filter(post => post.id !== postId));
      toast({
        title: "Post deleted",
        description: "The post has been successfully removed.",
      });
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting the post.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const deleteStory = async (storyId: string) => {
    try {
      await api.deleteStory(storyId);
      setStoriesList(prevStories => prevStories.filter(story => story.id !== storyId));
      toast({
        title: "Story deleted",
        description: "The story has been successfully removed.",
      });
      return true;
    } catch (error) {
      console.error('Error deleting story:', error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting the story.",
        variant: "destructive"
      });
      return false;
    }
  };
  
  const deletePaper = async (paperId: string) => {
    try {
      await api.deletePaper(paperId);
      setPapersList(prevPapers => prevPapers.filter(paper => paper.id !== paperId));
      toast({
        title: "Paper deleted",
        description: "The paper has been successfully removed.",
      });
      return true;
    } catch (error) {
      console.error('Error deleting paper:', error);
      toast({
        title: "Delete failed",
        description: "There was a problem deleting the paper.",
        variant: "destructive"
      });
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
        deleteProject,
        deletePost,
        deleteStory,
        deletePaper,
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
