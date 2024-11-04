import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import { Database } from '~/types/database.types';

const supabaseUrl = 'https://dhlfezdmcnodzwreqzrj.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobGZlemRtY25vZHp3cmVxenJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0ODUxMzksImV4cCI6MjA0NTA2MTEzOX0.WQaLytiMnZpvW6KV81CgFJBdIlFXkzrJFaWb15jkrdQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
