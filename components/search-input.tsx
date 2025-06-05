'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SearchInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="search"
          placeholder="Search AI tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#0F0627] border border-[#1E1145] rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-colors"
        />
      </div>
      <Button 
        type="submit" 
        className="ml-2 px-8 py-3 h-auto rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium"
      >
        Search
      </Button>
    </form>
  );
}