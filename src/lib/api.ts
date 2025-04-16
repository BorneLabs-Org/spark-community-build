
import { supabase } from '@/lib/supabase';
import { User, Project, Post, Story, Paper } from '@/types';

// Auth functions
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (error || !data) return null;
  
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    avatar: data.avatar_url || 'https://github.com/shadcn.png',
    followers: data.followers_count || 0
  } as User;
};

// Projects functions
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      description,
      image_url,
      sas_level,
      created_at,
      users:user_id (
        id,
        name,
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    image: item.image_url,
    sasLevel: item.sas_level,
    user: {
      id: item.users?.id,
      name: item.users?.name,
      username: item.users?.username,
      avatar: item.users?.avatar_url || 'https://github.com/shadcn.png'
    }
  })) as Project[];
};

// Posts functions
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      description,
      media_url,
      media_type,
      views,
      created_at,
      users:user_id (
        id,
        name,
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    media: item.media_url,
    mediaType: item.media_type as 'image' | 'video',
    views: item.views || 0,
    createdAt: item.created_at,
    user: {
      id: item.users?.id,
      name: item.users?.name,
      username: item.users?.username,
      avatar: item.users?.avatar_url || 'https://github.com/shadcn.png'
    }
  })) as Post[];
};

// Stories functions
export const getStories = async () => {
  const { data, error } = await supabase
    .from('stories')
    .select(`
      id,
      title,
      content,
      image_url,
      created_at,
      users:user_id (
        id,
        name,
        username,
        avatar_url
      ),
      projects:project_id (
        id,
        name,
        description,
        image_url
      )
    `)
    .order('created_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    content: item.content,
    image: item.image_url,
    createdAt: item.created_at,
    user: {
      id: item.users?.id,
      name: item.users?.name,
      username: item.users?.username,
      avatar: item.users?.avatar_url || 'https://github.com/shadcn.png'
    },
    project: item.projects ? {
      id: item.projects.id,
      name: item.projects.name,
      description: item.projects.description,
      image: item.projects.image_url,
      user: {
        id: item.users?.id,
        name: item.users?.name,
        username: item.users?.username,
        avatar: item.users?.avatar_url || 'https://github.com/shadcn.png'
      }
    } : undefined
  })) as Story[];
};

// Papers functions
export const getPapers = async () => {
  const { data, error } = await supabase
    .from('papers')
    .select(`
      id,
      title,
      description,
      file_url,
      file_type,
      cover_image,
      created_at,
      downloads,
      users:user_id (
        id,
        name,
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });
    
  if (error || !data) return [];
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    fileUrl: item.file_url,
    fileType: item.file_type as 'pdf' | 'doc' | 'docx' | 'image',
    coverImage: item.cover_image,
    createdAt: item.created_at,
    downloads: item.downloads || 0,
    user: {
      id: item.users?.id,
      name: item.users?.name,
      username: item.users?.username,
      avatar: item.users?.avatar_url || 'https://github.com/shadcn.png'
    }
  })) as Paper[];
};

// Bookmark functions
export const toggleBookmark = async (
  type: 'project' | 'post' | 'story' | 'paper',
  id: string
) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return false;
  
  // Check if bookmark exists
  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('bookmark_type', type)
    .eq('bookmark_id', id)
    .single();
    
  if (existingBookmark) {
    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', existingBookmark.id);
      
    return error ? false : true;
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: session.user.id,
        bookmark_type: type,
        bookmark_id: id
      });
      
    return error ? false : true;
  }
};

export const getBookmarkedItems = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return { projects: [], posts: [], stories: [], papers: [] };
  
  const { data, error } = await supabase
    .from('bookmarks')
    .select('bookmark_type, bookmark_id')
    .eq('user_id', session.user.id);
    
  if (error || !data) return { projects: [], posts: [], stories: [], papers: [] };
  
  return {
    projectIds: data.filter(item => item.bookmark_type === 'project').map(item => item.bookmark_id),
    postIds: data.filter(item => item.bookmark_type === 'post').map(item => item.bookmark_id),
    storyIds: data.filter(item => item.bookmark_type === 'story').map(item => item.bookmark_id),
    paperIds: data.filter(item => item.bookmark_type === 'paper').map(item => item.bookmark_id)
  };
};

// File upload function (for papers, profile images, etc.)
export const uploadFile = async (file: File, bucket: string, path: string = '') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : fileName;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
    
  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }
  
  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);
    
  return publicUrl.publicUrl;
};
