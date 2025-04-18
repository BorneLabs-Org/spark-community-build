
import { supabase } from '@/lib/supabase';
import { Paper } from '@/types';

export const getPapers = async () => {
  try {
    const { data: papers, error } = await supabase
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
        user_id,
        users (
          id,
          name,
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return papers.map(paper => ({
      id: paper.id,
      title: paper.title,
      description: paper.description,
      fileUrl: paper.file_url,
      fileType: paper.file_type,
      coverImage: paper.cover_image,
      createdAt: paper.created_at,
      downloads: paper.downloads || 0,
      user: {
        id: paper.users.id,
        name: paper.users.name,
        username: paper.users.username,
        avatar: paper.users.avatar_url || 'https://github.com/shadcn.png'
      }
    })) as Paper[];
  } catch (error) {
    console.error('Error fetching papers:', error);
    return [];
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

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error adding paper:', error);
    return false;
  }
};
