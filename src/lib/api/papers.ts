
import { supabase } from '@/lib/supabase';
import { Paper } from '@/types';

// Papers functions
export const getPapers = async () => {
  console.log('Fetching papers...');
  try {
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
        user_id
      `)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching papers:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No papers found');
      return [];
    }
    
    console.log('Papers fetched:', data.length);
    
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
        fileUrl: item.file_url,
        fileType: item.file_type as 'pdf' | 'doc' | 'docx' | 'image',
        coverImage: item.cover_image,
        createdAt: item.created_at,
        downloads: item.downloads || 0,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.avatar_url || 'https://github.com/shadcn.png'
        }
      };
    }) as Paper[];
  } catch (error) {
    console.error('Error in getPapers:', error);
    return [];
  }
};
