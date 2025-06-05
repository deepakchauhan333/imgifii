import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getStaticCategories() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  return categories || [];
}

export async function getStaticTools(limit = 100) {
  const { data: tools } = await supabase
    .from('tools')
    .select('*')
    .order('rating', { ascending: false })
    .limit(limit);
    
  return tools || [];
}