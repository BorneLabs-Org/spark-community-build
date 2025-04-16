
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

// Projects functions
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      description,
      image_url,
      sas_level,
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
      name: item.name,
      description: item.description,
      image: item.image_url,
      sasLevel: item.sas_level,
      user: {
        id: userObj ? userObj.id : null,
        name: userObj ? userObj.name : null,
        username: userObj ? userObj.username : null,
        avatar: (userObj && userObj.avatar_url) || 'https://github.com/shadcn.png'
      }
    };
  }) as Project[];
};
