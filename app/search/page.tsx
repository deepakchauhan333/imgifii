'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SearchInput } from '@/components/search-input';
import { ToolCard } from '@/components/tool-card';
import { Tool } from '@/lib/types';
import supabase from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchTools() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tools')
          .select('*')
          .ilike('name', `%${query}%`)
          .order('rating', { ascending: false });

        if (error) {
          throw error;
        }

        setTools(data || []);
      } catch (error) {
        console.error('Error searching tools:', error);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      searchTools();
    } else {
      setTools([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Results</h1>
      
      <div className="mb-8 max-w-2xl">
        <SearchInput />
      </div>
      
      {query ? (
        <>
          <p className="mb-6 text-muted-foreground">
            {loading 
              ? 'Searching...' 
              : tools.length === 0 
                ? 'No results found' 
                : `Found ${tools.length} result${tools.length === 1 ? '' : 's'} for "${query}"`
            }
          </p>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Enter a search term to find AI tools</p>
        </div>
      )}
    </div>
  );
}