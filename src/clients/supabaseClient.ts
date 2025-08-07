import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.DB_HOST || '', process.env.DB_PASSWORD || '');