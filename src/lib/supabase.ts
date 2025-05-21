import { createClient } from '@supabase/supabase-js';

const supabaseUrl ="https://btuamecajfgqhnvcnpcw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0dWFtZWNhamZncWhudmNucGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MzMwNDAsImV4cCI6MjA2MzQwOTA0MH0.rRNuN5u9sBTyQ0piiicB6PQIZUAenFHzU9O-nlsuSnI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);