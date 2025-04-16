
import { supabase } from '@/lib/supabase';
import { User } from '@/types';

// Auth functions
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (error || !data) return null;
  
  return {
    id: data.id,
    name: data.name,
    username: data.username,
    avatar: data.avatar_url || 'https://github.com/shadcn.png',
    followers: data.followers_count || 0
  } as User;
};
