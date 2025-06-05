import Link from 'next/link';
import { getCategories } from '@/app/api/supabase-server';
import { CategoryCard } from '@/components/category-card';
import { Suspense } from 'react';

export async function CategorySection() {
  const categories = await getCategories();

  return (
    <section id="categories" className="relative">
      <h2 className="text-3xl font-bold mb-8">Explore by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Suspense>
      </div>
    </section>
  );
}