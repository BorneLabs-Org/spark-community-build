
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  user: User;
  projectId?: string;
  status?: 'pending' | 'approved' | 'rejected';
  bookmarked?: boolean;
  sasLevel?: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  media: string;
  mediaType: 'image' | 'video';
  user: User;
  views: number;
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  project?: Project;
  user: User;
  bookmarked?: boolean;
  createdAt: string;
  image?: string;
}

export interface Paper {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'docx' | 'image';
  coverImage: string;
  user: User;
  createdAt: string;
  downloads: number;
}
