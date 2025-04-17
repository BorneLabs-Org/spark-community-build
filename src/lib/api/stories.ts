
import { supabase } from '@/lib/supabase';
import { Story } from '@/types';

// Stories functions
export const getStories = async () => {
  console.log('Fetching stories...');
  try {
    const { data, error } = await supabase
      .from('stories')
      .select(`
        id,
        title,
        content,
        image_url,
        created_at,
        user_id,
        project_id
      `)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching stories:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No stories found');
      return [];
    }
    
    console.log('Stories fetched:', data.length);
    
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
    
    // Fetch project data if needed
    const projectIds = data.filter(item => item.project_id).map(item => item.project_id);
    let projectsData: Record<string, any> = {};
    
    if (projectIds.length > 0) {
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('id, name, description, image_url, user_id')
        .in('id', projectIds);
        
      if (projectsError) {
        console.error('Error fetching projects:', projectsError);
      } else if (projects) {
        projectsData = projects.reduce((acc: Record<string, any>, project) => {
          acc[project.id] = project;
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
      
      const projectData = item.project_id ? projectsData[item.project_id] : null;
      
      return {
        id: item.id,
        title: item.title,
        content: item.content,
        image: item.image_url,
        createdAt: item.created_at,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: user.avatar_url || 'https://github.com/shadcn.png'
        },
        project: projectData ? {
          id: projectData.id,
          name: projectData.name,
          description: projectData.description,
          image: projectData.image_url,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            avatar: user.avatar_url || 'https://github.com/shadcn.png'
          }
        } : undefined
      };
    }) as Story[];
  } catch (error) {
    console.error('Error in getStories:', error);
    return [];
  }
};
