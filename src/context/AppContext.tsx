
import React, { createContext, useContext, useState } from 'react';
import { User, Project, Post, Story } from '../types';

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
}

const defaultContext: AppContextType = {
  currentUser: null,
  projects: [],
  posts: [],
  stories: [],
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setCurrentUser: () => {},
  addProject: () => {},
  addPost: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Tab Killer",
      description: "A browser extension that helps manage your tabs",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      user: {
        id: "1",
        name: "John Doe",
        username: "johndoe",
        avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=100&auto=format&fit=crop",
        followers: 210
      },
      sasLevel: "SAS.6"
    },
    {
      id: "2",
      name: "Grid Forum",
      description: "An open-source platform for AI models to collaborate",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      user: {
        id: "2",
        name: "Jane Smith",
        username: "janesmith",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop",
        followers: 345
      },
      sasLevel: "SAS.1"
    },
    {
      id: "3",
      name: "Cognito",
      description: "AI-powered cognitive enhancement tools",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      user: {
        id: "3",
        name: "Alex Johnson",
        username: "alexj",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop",
        followers: 512
      },
      sasLevel: "SAS.4"
    },
    {
      id: "4",
      name: "KSA",
      description: "Knowledge sharing application",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      user: {
        id: "4",
        name: "Sam Wilson",
        username: "samwilson",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
        followers: 178
      },
      sasLevel: "SAS.2"
    }
  ]);
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Oxygen Eco-Tank",
      description: "A sustainable oxygen tank for underwater exploration",
      media: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      mediaType: "image",
      user: {
        id: "5",
        name: "Sarah Palmer",
        username: "sarahp",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format&fit=crop",
        followers: 2100
      },
      views: 523,
      createdAt: "2023-06-12T10:30:00Z"
    },
    {
      id: "2",
      title: "Hydro Bike",
      description: "A water-powered bicycle concept",
      media: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      mediaType: "image",
      user: {
        id: "6",
        name: "Faith Stereo",
        username: "faithstereo",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
        followers: 2000
      },
      views: 432,
      createdAt: "2023-06-14T14:45:00Z"
    },
    {
      id: "3",
      title: "Need Help in aligning the",
      description: "Technical assistance needed for alignment",
      media: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      mediaType: "image",
      user: {
        id: "7",
        name: "Rachel Forrest",
        username: "rachelforrest",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100&auto=format&fit=crop",
        followers: 3700
      },
      views: 189,
      createdAt: "2023-06-15T08:20:00Z"
    },
    {
      id: "4",
      title: "Syrs of modeling and this",
      description: "Advances in 3D modeling techniques",
      media: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      mediaType: "image",
      user: {
        id: "8",
        name: "Skip Jay",
        username: "skipjay",
        avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=100&auto=format&fit=crop",
        followers: 2000
      },
      views: 302,
      createdAt: "2023-06-16T12:30:00Z"
    }
  ]);
  
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      title: "SAS.1 The Grid - A Forgotten project",
      content: "Grid Forum is an open-source platform where AI models collaborate and share knowledge, enhancing their collective intelligence. It also includes features like Glink, a secure browser for efficient AI collaboration.",
      user: {
        id: "2",
        name: "Jane Smith",
        username: "janesmith",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop",
        followers: 345
      },
      project: projects[1],
      createdAt: "2023-05-10T09:30:00Z"
    },
    {
      id: "2",
      title: "Making of the Flux Pulse Motor",
      content: "The JAE-1 Flux Pulse Motor is an experimental propulsion system designed to enhance thrust efficiency through controlled flux pulsing, optimizing energy conversion and minimizing losses, it aims to create more efficient and scalable propulsion technology for future applications.",
      user: {
        id: "9",
        name: "Peter Maxwell",
        username: "petermaxwell",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop",
        followers: 1823
      },
      createdAt: "2023-05-15T14:20:00Z"
    }
  ]);
  
  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };
  
  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
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
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
