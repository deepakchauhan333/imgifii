import { getTopTools } from '@/app/api/supabase-server';
import { ToolCard } from '@/components/tool-card';
import { SearchInput } from '@/components/search-input';

export default async function ToolsPage() {
  const tools = await getTopTools(100); // Get up to 100 tools

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">All AI Tools</h1>
      
      <div className="mb-8 max-w-2xl">
        <SearchInput />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}