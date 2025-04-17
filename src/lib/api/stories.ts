
import { supabase } from '@/lib/supabase';
import { Story } from '@/types';

// Stories functions
export const getStories = async () => {
  console.log('Fetching stories from Supabase...');
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
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log('No stories found in Supabase');
      return [];
    }
    
    console.log('Stories fetched successfully:', data.length);
    
    // Fetch users data
    const userIds = [...new Set(data.map(item => item.user_id).filter(Boolean))];
    let users = [];
    
    if (userIds.length > 0) {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name, username, avatar_url')
        .in('id', userIds);
        
      if (usersError) {
        console.error('Error fetching users for stories:', usersError);
      } else {
        users = usersData || [];
      }
    }
    
    // Fetch project data if needed
    const projectIds = data.filter(item => item.project_id).map(item => item.project_id);
    let projects = [];
    
    if (projectIds.length > 0) {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('id, name, description, image_url, user_id')
        .in('id', projectIds);
        
      if (projectsError) {
        console.error('Error fetching projects for stories:', projectsError);
      } else {
        projects = projectsData || [];
      }
    }
    
    return data.map(item => {
      const user = users.find(u => u.id === item.user_id) || { 
        id: item.user_id, 
        name: 'Unknown User', 
        username: 'unknown', 
        avatar_url: 'https://github.com/shadcn.png' 
      };
      
      const projectData = item.project_id ? projects.find(p => p.id === item.project_id) : null;
      
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
    throw error;
  }
};

export const addStory = async (story: Omit<Story, 'id' | 'createdAt'>) => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .insert({
        title: story.title,
        content: story.content,
        image_url: story.image,
        user_id: story.user.id,
        project_id: story.project?.id
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating story:', error);
      throw error;
    }
    
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      image: data.image_url,
      createdAt: data.created_at,
      user: story.user,
      project: story.project
    } as Story;
  } catch (error) {
    console.error('Failed to add story:', error);
    throw error;
  }
};

export const deleteStory = async (storyId: string) => {
  try {
    console.log(`Deleting story with ID: ${storyId}`);
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', storyId);
      
    if (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
    
    console.log(`Story ${storyId} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Failed to delete story:', error);
    throw error;
  }
};
