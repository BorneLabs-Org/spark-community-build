
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useAppContext } from '@/context/app';
import { useToast } from '@/hooks/use-toast';
import { AuthContext } from './context';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { setIsLoggedIn, setCurrentUser } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session) {
          // Use setTimeout to prevent potential deadlocks with Supabase
          setTimeout(async () => {
            try {
              // Get user profile from the database
              const { data: userData, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (error) {
                console.error('Error fetching user data:', error);
                return;
              }
              
              if (!userData) {
                // User doesn't exist in the database yet, try to create
                const metadata = session.user.user_metadata || {};
                
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
                  console.error('Error creating user in database:', insertError);
                  return;
                }
                
                setCurrentUser({
                  id: newUser.id,
                  name: newUser.name,
                  username: newUser.username,
                  avatar: newUser.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
                  followers: newUser.followers_count || 0
                });
              } else {
                setCurrentUser({
                  id: userData.id,
                  name: userData.name,
                  username: userData.username,
                  avatar: userData.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
                  followers: userData.followers_count || 0
                });
              }
              
              setIsLoggedIn(true);
            } catch (error) {
              console.error('Error in auth state change handler:', error);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Get user profile from the database
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle()
          .then(({ data: userData, error }) => {
            if (error) {
              console.error('Error fetching initial user data:', error);
              setLoading(false);
              return;
            }
            
            if (userData) {
              setCurrentUser({
                id: userData.id,
                name: userData.name,
                username: userData.username,
                avatar: userData.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
                followers: userData.followers_count || 0
              });
              setIsLoggedIn(true);
            } else {
              console.log('User not found in database during initial check');
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setCurrentUser, setIsLoggedIn]);

  const signUp = async (email: string, password: string, username: string, name: string) => {
    try {
      setLoading(true);
      
      // Check if username already exists
      const { data: usernameCheck, error: usernameError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .maybeSingle();
      
      if (usernameCheck) {
        toast({
          title: "Username already taken",
          description: "Please choose a different username",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      // Create auth user
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            username,
            name
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create user profile in database
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            name,
            username,
            email
          });
          
        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw profileError;
        }
        
        toast({
          title: "Account created",
          description: "Your account has been successfully created"
        });
        
        // Update app context
        setCurrentUser({
          id: data.user.id,
          name,
          username,
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
          followers: 0
        });
        setIsLoggedIn(true);
        
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "There was a problem creating your account",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Get user profile from the database
        const { data: userData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();
        
        // If profile doesn't exist yet, create it
        if (!userData && !profileError) {
          const metadata = data.user.user_metadata || {};
          
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              name: metadata.name || data.user.email?.split('@')[0] || 'User',
              username: metadata.username || data.user.email?.split('@')[0] || `user_${Date.now()}`,
              email: data.user.email
            })
            .select('*')
            .single();
            
          if (insertError) throw insertError;
          
          setCurrentUser({
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
            avatar: newUser.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
            followers: 0
          });
        } else if (userData) {
          // Update app context with existing user
          setCurrentUser({
            id: userData.id,
            name: userData.name,
            username: userData.username,
            avatar: userData.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
            followers: userData.followers_count || 0
          });
        } else if (profileError) {
          throw profileError;
        }
        
        setIsLoggedIn(true);
        
        toast({
          title: "Signed in successfully",
          description: "Welcome back!"
        });
        
        navigate('/');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Error signing in",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      setIsLoggedIn(false);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out"
      });
      navigate('/signin');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "There was a problem signing you out",
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
