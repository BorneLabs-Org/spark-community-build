
import { supabase } from '@/lib/supabase';
import { User } from '@/types';

// Auth functions
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return null;
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors
      
    if (error || !data) return null;
    
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      avatar: data.avatar_url || 'https://github.com/shadcn.png',
      followers: data.followers_count || 0
    } as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
