
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

// Projects functions
export const getProjects = async () => {
  console.log('Fetching projects...');
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        name,
        description,
        image_url,
        sas_level,
        created_at,
        user_id
      `)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No projects found');
      return [];
    }
    
    console.log('Projects fetched:', data.length);
    
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
        name: item.name,
        description: item.description,
        image: item.image_url,
        sasLevel: item.sas_level,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.avatar_url || 'https://github.com/shadcn.png'
        }
      };
    }) as Project[];
  } catch (error) {
    console.error('Error in getProjects:', error);
    return [];
  }
};
