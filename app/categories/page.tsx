import { getCategories } from '@/app/api/supabase-server';
import { CategoryCard } from '@/components/category-card';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Categories</h1>
      
      <p className="text-muted-foreground mb-10 max-w-3xl">
        Browse AI tools by category to find the perfect solution for your needs.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}