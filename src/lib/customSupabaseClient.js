import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpfulogmqxcqikloibym.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwZnVsb2dtcXhjcWlrbG9pYnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0Nzg1ODAsImV4cCI6MjA2OTA1NDU4MH0.wBdHx1WYr4EZJDA5NN3c8_zVLQdvuNULiwnuxW6TtLQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);