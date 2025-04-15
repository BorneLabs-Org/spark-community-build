import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useAppContext } from '@/context/app';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, username: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { setIsLoggedIn, setCurrentUser } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session on initial load
    const initializeAuth = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
        setUser(session.user);
        
        // Get user profile from the database
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData && !error) {
          setCurrentUser({
            id: userData.id,
            name: userData.name,
            username: userData.username,
            avatar: userData.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
            followers: 0
          });
          setIsLoggedIn(true);
        }
      }
      
      setLoading(false);
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session) {
          // Use setTimeout to prevent potential deadlocks with Supabase
          setTimeout(async () => {
            // Get user profile from the database
            const { data: userData, error } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (userData && !error) {
              setCurrentUser({
                id: userData.id,
                name: userData.name,
                username: userData.username,
                avatar: userData.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
                followers: 0
              });
              setIsLoggedIn(true);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setIsLoggedIn(false);
        }
      }
    );

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
        .single();
      
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
        // In Supabase, we'll create a trigger to handle user creation
        // We don't need to manually insert into the users table anymore
        
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
          .single();
        
        if (profileError) throw profileError;
        
        toast({
          title: "Signed in successfully",
          description: "Welcome back!"
        });
        
        // Update app context
        setCurrentUser({
          id: userData.id,
          name: userData.name,
          username: userData.username,
          avatar: userData.avatar_url || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
          followers: 0
        });
        setIsLoggedIn(true);
        
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
