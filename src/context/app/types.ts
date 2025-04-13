
import { User, Project, Post, Story } from '../../types';

export interface AppContextType {
  currentUser: User | null;
  projects: Project[];
  posts: Post[];
  stories: Story[];
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  addProject: (project: Project) => void;
  addPost: (post: Post) => void;
  addStory: (story: Story) => void;
}
