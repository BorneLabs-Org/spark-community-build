
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

export const getProjects = async () => {
  try {
    console.log('Fetching projects from Supabase...');
    
    // Fetch projects with all necessary details
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        name, 
        description, 
        image_url, 
        sas_level,
        user_id,
        created_at
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
    
    // If no projects, return empty array
    if (!data || data.length === 0) {
      console.log('No projects found in Supabase');
      return [];
    }
    
    console.log(`Successfully fetched ${data.length} projects from Supabase`);
    
    // Fetch associated user details
    const userIds = [...new Set(data.map(project => project.user_id).filter(Boolean))];
    let users = [];
    
    if (userIds.length > 0) {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name, username, avatar_url')
        .in('id', userIds);
        
      if (usersError) {
        console.error('Error fetching users for projects:', usersError);
      } else {
        users = usersData || [];
      }
    }
    
    // Map projects with user details
    return data.map(project => {
      const projectUser = users.find(user => user.id === project.user_id) || {
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
    throw error;
  }
};

export const addProject = async (project: Omit<Project, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        name: project.name,
        description: project.description,
        image_url: project.image,
        sas_level: project.sasLevel,
        user_id: project.user.id
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      image: data.image_url,
      sasLevel: data.sas_level,
      user: project.user
    } as Project;
  } catch (error) {
    console.error('Failed to add project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    console.log(`Deleting project with ID: ${projectId}`);
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
      
    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
    
    console.log(`Project ${projectId} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw error;
  }
};
