
import { User, Project, Post, Story, Paper } from '@/types';

export interface AppContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  projects: Project[];
  posts: Post[];
  stories: Story[];
  papers: Paper[];
  addPaper: (paper: Paper) => void;
}
