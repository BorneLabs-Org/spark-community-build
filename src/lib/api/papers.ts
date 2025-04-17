
import { supabase } from '@/lib/supabase';
import { Paper } from '@/types';

// Papers functions
export const getPapers = async () => {
  console.log('Fetching papers from Supabase...');
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
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log('No papers found in Supabase');
      return [];
    }
    
    console.log('Papers fetched successfully:', data.length);
    
    // Fetch users data
    const userIds = [...new Set(data.map(item => item.user_id).filter(Boolean))];
    let users = [];
    
    if (userIds.length > 0) {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name, username, avatar_url')
        .in('id', userIds);
        
      if (usersError) {
        console.error('Error fetching users for papers:', usersError);
      } else {
        users = usersData || [];
      }
    }
    
    return data.map(item => {
      const user = users.find(u => u.id === item.user_id) || { 
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
    throw error;
  }
};

export const addPaper = async (paper: Omit<Paper, 'id' | 'createdAt' | 'downloads'>) => {
  try {
    const { data, error } = await supabase
      .from('papers')
      .insert({
        title: paper.title,
        description: paper.description,
        file_url: paper.fileUrl,
        file_type: paper.fileType,
        cover_image: paper.coverImage,
        user_id: paper.user.id
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating paper:', error);
      throw error;
    }
    
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      fileUrl: data.file_url,
      fileType: data.file_type,
      coverImage: data.cover_image,
      createdAt: data.created_at,
      downloads: 0,
      user: paper.user
    } as Paper;
  } catch (error) {
    console.error('Failed to add paper:', error);
    throw error;
  }
};

export const deletePaper = async (paperId: string) => {
  try {
    console.log(`Deleting paper with ID: ${paperId}`);
    const { error } = await supabase
      .from('papers')
      .delete()
      .eq('id', paperId);
      
    if (error) {
      console.error('Error deleting paper:', error);
      throw error;
    }
    
    console.log(`Paper ${paperId} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Failed to delete paper:', error);
    throw error;
  }
};
