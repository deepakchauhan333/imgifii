import { getCategories } from '@/app/api/supabase-server';
import { getStaticCategories } from '@/app/api/supabase-client';
import { getToolsByCategory } from '@/app/api/supabase-server';
import { ToolCard } from '@/components/tool-card';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await getStaticCategories();
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    return notFound();
  }
  
  const tools = await getToolsByCategory(category.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">{category.name}</h1>
      
      <p className="text-muted-foreground mb-10 max-w-3xl">
        {category.description || `Explore the best ${category.name.toLowerCase()} tools.`}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.length > 0 ? (
          tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-12">
            No tools found in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}