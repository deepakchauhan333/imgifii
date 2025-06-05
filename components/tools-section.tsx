import Link from 'next/link';
import { getTopTools } from '@/app/api/supabase-server';
import { ToolCard } from '@/components/tool-card';

export async function ToolsSection() {
  const tools = await getTopTools();

  return (
    <section id="top-tools" className="relative">
      <h2 className="text-3xl font-bold mb-8">Top AI Tools</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link
          href="/tools"
          className="inline-flex items-center justify-center rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          View All Tools
        </Link>
      </div>
    </section>
  );
}