
import { supabase } from '@/lib/supabase';
import { Post } from '@/types';

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
  
  return data.map(item => {
    // Ensure users is treated as a single object, not an array
    const userObj = item.users as any;
    
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      media: item.media_url,
      mediaType: item.media_type as 'image' | 'video',
      views: item.views || 0,
      createdAt: item.created_at,
      user: {
        id: userObj ? userObj.id : null,
        name: userObj ? userObj.name : null,
        username: userObj ? userObj.username : null,
        avatar: (userObj && userObj.avatar_url) || 'https://github.com/shadcn.png'
      }
    };
  }) as Post[];
};
