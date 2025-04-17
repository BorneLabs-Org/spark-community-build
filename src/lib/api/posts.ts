
import { supabase } from '@/lib/supabase';
import { Post } from '@/types';

// Posts functions
export const getPosts = async () => {
  console.log('Fetching posts...');
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
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No posts found');
      return [];
    }
    
    console.log('Posts fetched:', data.length);
    
    // Now fetch the user data separately
    const userIds = data.map(item => item.user_id).filter(Boolean);
    
    let usersData: Record<string, any> = {};
    
    if (userIds.length > 0) {
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, name, username, avatar_url')
        .in('id', userIds);
        
      if (usersError) {
        console.error('Error fetching users:', usersError);
      } else if (users) {
        usersData = users.reduce((acc: Record<string, any>, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
      }
    }
    
    return data.map(item => {
      const user = usersData[item.user_id] || { 
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
    return [];
  }
};
