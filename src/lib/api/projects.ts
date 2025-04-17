
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

export const getProjects = async () => {
  try {
    console.log('Fetching projects...');
    
    // Fetch projects with all necessary details
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        name, 
        description, 
        image_url, 
        sas_level,
        user_id
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    // If no projects, return empty array
    if (!data || data.length === 0) {
      console.log('No projects found');
      return [];
    }
    
    // Fetch associated user details
    const userIds = [...new Set(data.map(project => project.user_id).filter(Boolean))];
    const { data: users, error: usersError } = userIds.length > 0 
      ? await supabase
          .from('users')
          .select('id, name, username, avatar_url')
          .in('id', userIds)
      : { data: [], error: null };
    
    if (usersError) {
      console.error('Error fetching users:', usersError);
    }
    
    // Map projects with user details
    return data.map(project => {
      const projectUser = users?.find(user => user.id === project.user_id) || {
        id: project.user_id,
        name: 'Unknown User',
        username: 'unknown',
        avatar_url: 'https://github.com/shadcn.png'
      };
      
      return {
        id: project.id,
        name: project.name,
        description: project.description,
        image: project.image_url,
        sasLevel: project.sas_level,
        user: {
          id: projectUser.id,
          name: projectUser.name,
          username: projectUser.username,
          avatar: projectUser.avatar_url || 'https://github.com/shadcn.png'
        }
      } as Project;
    });
  } catch (error) {
    console.error('Unexpected error in getProjects:', error);
    return [];
  }
};
