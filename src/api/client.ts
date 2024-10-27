import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const client = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export default client;
