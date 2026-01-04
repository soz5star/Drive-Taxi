import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only initialize if the URL and Key are provided to avoid runtime errors
// If they are missing, we'll export a dummy client or handle it gracefully
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'drivetaxi-auth',
      }
    })
  : null;

// Helper to check if supabase is configured
export const isSupabaseConfigured = () => !!supabase;
