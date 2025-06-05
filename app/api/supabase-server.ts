import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Category, Tool } from '@/lib/types';

export async function createClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://opmsmqtxqrivlyigpudk.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wbXNtcXR4cXJpdmx5aWdwdWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTUzOTQsImV4cCI6MjA1OTE3MTM5NH0.H-tPEzI6f_4hhptimscHWbfw4sqeGuLe09zfEyEHlHA',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

export async function getTopTools(limit = 4): Promise<Tool[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching top tools:', error);
    return [];
  }

  return data || [];
}

export async function getToolsByCategory(categoryId: number): Promise<Tool[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', categoryId)
    .order('rating', { ascending: false });

  if (error) {
    console.error(`Error fetching tools for category ${categoryId}:`, error);
    return [];
  }

  return data || [];
}

export async function searchTools(query: string): Promise<Tool[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error searching tools:', error);
    return [];
  }

  return data || [];
}