
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Use the actual Supabase URL and key from the integration
const supabaseUrl = "https://vyacitwbkrhousvmeuaq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5YWNpdHdia3Job3Vzdm1ldWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNjIzOTQsImV4cCI6MjA1OTkzODM5NH0.WXs4uJjuzCidtx0GrSsvk6gyPI8A-xwjotsD98Ie3Y4";

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'supabase-auth'
    }
  }
);
