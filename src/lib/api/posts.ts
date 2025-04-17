
import { supabase } from '@/lib/supabase';
import { Post } from '@/types';

// Posts functions
export const getPosts = async () => {
  console.log('Fetching posts from Supabase...');
  try {
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
        user_id
      `)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log('No posts found in Supabase');
      return [];
    }
    
    console.log('Posts fetched successfully:', data.length);
    
    // Now fetch the user data separately
    const userIds = [...new Set(data.map(item => item.user_id).filter(Boolean))];
    let users = [];
    
    if (userIds.length > 0) {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name, username, avatar_url')
        .in('id', userIds);
        
      if (usersError) {
        console.error('Error fetching users for posts:', usersError);
      } else {
        users = usersData || [];
      }
    }
    
    return data.map(item => {
      const user = users.find(u => u.id === item.user_id) || { 
        id: item.user_id, 
        name: 'Unknown User', 
        username: 'unknown', 
        avatar_url: 'https://github.com/shadcn.png' 
      };
      
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        media: item.media_url,
        mediaType: item.media_type as 'image' | 'video',
        views: item.views || 0,
        createdAt: item.created_at,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.avatar_url || 'https://github.com/shadcn.png'
        }
      };
    }) as Post[];
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
};

export const addPost = async (post: Omit<Post, 'id' | 'createdAt' | 'views'>) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: post.title,
        description: post.description,
        media_url: post.media,
        media_type: post.mediaType,
        user_id: post.user.id
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating post:', error);
      throw error;
    }
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      media: data.media_url,
      mediaType: data.media_type,
      views: 0,
      createdAt: data.created_at,
      user: post.user
    } as Post;
  } catch (error) {
    console.error('Failed to add post:', error);
    throw error;
  }
};
