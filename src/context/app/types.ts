
import { User, Project, Post, Story, Paper } from '@/types';

export interface AppContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  projects: Project[];
  posts: Post[];
  stories: Story[];
  papers: Paper[];
  addPaper: (paper: Omit<Paper, 'id' | 'createdAt' | 'downloads'>) => Promise<boolean>;
  addProject: (project: Omit<Project, 'id'>) => Promise<boolean>;
  addPost: (post: Post) => Promise<boolean>;
  addStory: (story: Story) => Promise<boolean>;
  deleteProject: (projectId: string) => Promise<boolean>;
  deletePost: (postId: string) => Promise<boolean>;
  deleteStory: (storyId: string) => Promise<boolean>;
  deletePaper: (paperId: string) => Promise<boolean>;
}
