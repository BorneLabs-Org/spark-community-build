
import { supabase } from '@/lib/supabase';

// Bookmark functions
export const toggleBookmark = async (
  type: 'project' | 'post' | 'story' | 'paper',
  id: string
) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return false;
  
  // Check if bookmark exists
  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('bookmark_type', type)
    .eq('bookmark_id', id)
    .single();
    
  if (existingBookmark) {
    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', existingBookmark.id);
      
    return error ? false : true;
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('bookmarks')
      .insert({
        user_id: session.user.id,
        bookmark_type: type,
        bookmark_id: id
      });
      
    return error ? false : true;
  }
};

export const getBookmarkedItems = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return { projects: [], posts: [], stories: [], papers: [] };
  
  const { data, error } = await supabase
    .from('bookmarks')
    .select('bookmark_type, bookmark_id')
    .eq('user_id', session.user.id);
    
  if (error || !data) return { projects: [], posts: [], stories: [], papers: [] };
  
  return {
    projectIds: data.filter(item => item.bookmark_type === 'project').map(item => item.bookmark_id),
    postIds: data.filter(item => item.bookmark_type === 'post').map(item => item.bookmark_id),
    storyIds: data.filter(item => item.bookmark_type === 'story').map(item => item.bookmark_id),
    paperIds: data.filter(item => item.bookmark_type === 'paper').map(item => item.bookmark_id)
  };
};
