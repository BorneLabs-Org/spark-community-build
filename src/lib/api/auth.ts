
import { supabase } from '@/lib/supabase';
import { User } from '@/types';

// Auth functions
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user) return null;
  
  try {
    // Check if user exists in the users table
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors
      
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    // If user doesn't exist in the users table yet, we need to create it
    if (!data) {
      // Get user metadata from auth
      const metadata = session.user.user_metadata || {};
      
      // Create user in the users table
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: session.user.id,
          name: metadata.name || session.user.email?.split('@')[0] || 'User',
          username: metadata.username || session.user.email?.split('@')[0] || `user_${Date.now()}`,
          email: session.user.email
        })
        .select('*')
        .single();
        
      if (insertError) {
        console.error('Error creating user:', insertError);
        return null;
      }
      
      return {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        avatar: newUser.avatar_url || 'https://github.com/shadcn.png',
        followers: newUser.followers_count || 0
      } as User;
    }
    
    // Return existing user
    return {
      id: data.id,
      name: data.name,
      username: data.username,
      avatar: data.avatar_url || 'https://github.com/shadcn.png',
      followers: data.followers_count || 0
    } as User;
  } catch (error) {
    console.error('Error processing user:', error);
    return null;
  }
};
