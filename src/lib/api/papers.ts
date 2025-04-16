
import { supabase } from '@/lib/supabase';
import { Paper } from '@/types';

// Papers functions
export const getPapers = async () => {
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
      fileUrl: item.file_url,
      fileType: item.file_type as 'pdf' | 'doc' | 'docx' | 'image',
      coverImage: item.cover_image,
      createdAt: item.created_at,
      downloads: item.downloads || 0,
      user: {
        id: userObj ? userObj.id : null,
        name: userObj ? userObj.name : null,
        username: userObj ? userObj.username : null,
        avatar: (userObj && userObj.avatar_url) || 'https://github.com/shadcn.png'
      }
    };
  }) as Paper[];
};
