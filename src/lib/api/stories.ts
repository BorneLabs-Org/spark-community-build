
import { supabase } from '@/lib/supabase';
import { Story } from '@/types';

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
  
  return data.map(item => {
    // Ensure users and projects are treated as single objects, not arrays
    const userObj = item.users as any;
    const projectObj = item.projects as any;
    
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.image_url,
      createdAt: item.created_at,
      user: {
        id: userObj ? userObj.id : null,
        name: userObj ? userObj.name : null,
        username: userObj ? userObj.username : null,
        avatar: (userObj && userObj.avatar_url) || 'https://github.com/shadcn.png'
      },
      project: projectObj ? {
        id: projectObj.id,
        name: projectObj.name,
        description: projectObj.description,
        image: projectObj.image_url,
        user: {
          id: userObj ? userObj.id : null,
          name: userObj ? userObj.name : null,
          username: userObj ? userObj.username : null,
          avatar: (userObj && userObj.avatar_url) || 'https://github.com/shadcn.png'
        }
      } : undefined
    };
  }) as Story[];
};
