import { getTopTools } from '@/app/api/supabase-server';
import { getStaticTools } from '@/app/api/supabase-client';
import { Button } from '@/components/ui/button';
import { StarIcon, ExternalLinkIcon, Share2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const tools = await getStaticTools(100);
  
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = params;
  const tools = await getTopTools(100);
  const tool = tools.find(t => t.slug === slug);
  
  if (!tool) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-xl bg-primary/10">
              {tool.logo_url ? (
                <Image 
                  src={tool.logo_url} 
                  alt={tool.name} 
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/20">
                  <span className="text-3xl font-bold">{tool.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
                
                <div className="flex items-center mt-2 space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={cn(
                        "h-5 w-5",
                        i < Math.round(tool.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                      )} 
                    />
                  ))}
                  <span className="ml-2 text-muted-foreground">{tool.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Share2Icon className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <p className="mt-4 text-foreground/90">{tool.description}</p>
            
            <div className="mt-6">
              <Link href={tool.website_url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90">
                  Visit Website
                  <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}