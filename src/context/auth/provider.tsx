
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
    // Comprehensive auth state management
    const loadSession = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        // Set initial session and user
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // If user exists, fetch and set user details
        if (initialSession?.user) {
          try {
            const { data: userData, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', initialSession.user.id)
              .maybeSingle();

            if (error) {
              console.error('Error fetching user data:', error);
            }

            // If user doesn't exist in database, create profile
            if (!userData) {
              const metadata = initialSession.user.user_metadata || {};
              const { data: newUser, error: insertError } = await supabase
                .from('users')
                .insert({
                  id: initialSession.user.id,
                  name: metadata.name || initialSession.user.email?.split('@')[0] || 'User',
                  username: metadata.username || initialSession.user.email?.split('@')[0] || `user_${Date.now()}`,
                  email: initialSession.user.email
                })
                .select('*')
                .single();

              if (insertError) {
                console.error('Error creating user profile:', insertError);
              } else {
                setCurrentUser({
                  id: newUser.id,
                  name: newUser.name,
                  username: newUser.username,
                  avatar: newUser.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
                  followers: 0
                });
              }
            } else {
              // Set existing user details
              setCurrentUser({
                id: userData.id,
                name: userData.name,
                username: userData.username,
                avatar: userData.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
                followers: userData.followers_count || 0
              });
            }

            setIsLoggedIn(true);
          } catch (profileError) {
            console.error('Profile setup error:', profileError);
          }
        }
      } catch (error) {
        console.error('Session loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial session load
    loadSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN' && session) {
          setIsLoggedIn(true);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setIsLoggedIn(false);
          navigate('/signin');
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [setCurrentUser, setIsLoggedIn, navigate]);

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
        toast({
          title: "Signed in successfully",
          description: "Welcome back!"
        });
        
        navigate('/');
      }
    } catch (error: any) {
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
