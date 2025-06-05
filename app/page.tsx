import { HeroSection } from '@/components/hero-section';
import { CategorySection } from '@/components/category-section';
import { ToolsSection } from '@/components/tools-section';
import { SubmitSection } from '@/components/submit-section';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-12 space-y-20">
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection />
        </Suspense>
        
        <Suspense fallback={<ToolsSkeleton />}>
          <ToolsSection />
        </Suspense>
        
        <SubmitSection />
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function ToolsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}