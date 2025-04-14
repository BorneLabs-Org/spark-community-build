
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// These environment variables are automatically injected by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please make sure your Supabase integration is properly set up.');
}

// Create the Supabase client with fallback empty strings to prevent runtime errors
// (this will still log errors, but won't crash the app during development)
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
