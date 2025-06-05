'use client';

import { Tool } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <motion.div
        className="tool-card flex items-center p-4 rounded-xl bg-card card-glow h-full"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <div className="flex-shrink-0 mr-5">
          <motion.div
            className="relative w-16 h-16 overflow-hidden rounded-lg bg-primary/10"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {tool.logo_url ? (
              <Image 
                src={tool.logo_url} 
                alt={tool.name} 
                width={64} 
                height={64}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/20">
                <span className="text-xl font-bold">{tool.name.charAt(0)}</span>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{tool.name}</h3>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(tool.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                  )} 
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{tool.description}</p>
        </div>
      </motion.div>
    </Link>
  );
}