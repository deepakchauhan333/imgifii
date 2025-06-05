'use client';

import { Category } from '@/lib/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Image, 
  Pencil, 
  Code, 
  Music, 
  VideoIcon, 
  Brain, 
  Database 
} from 'lucide-react';
import { useState } from 'react';

const iconMap: Record<string, React.ReactNode> = {
  chatbot: <Bot size={36} />,
  image: <Image size={36} />,
  writer: <Pencil size={36} />,
  code: <Code size={36} />,
  music: <Music size={36} />,
  video: <VideoIcon size={36} />,
  ml: <Brain size={36} />,
  data: <Database size={36} />,
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get icon from map or use a default icon based on category name
  // This is a fallback in case no icon_url is provided
  const getIconComponent = () => {
    if (category.slug && iconMap[category.slug.toLowerCase()]) {
      return iconMap[category.slug.toLowerCase()];
    }
    // Default to Brain icon
    return <Brain size={36} />;
  };

  return (
    <Link href={`/categories/${category.slug}`}>
      <motion.div
        className="category-card relative overflow-hidden rounded-xl bg-card p-6 cursor-pointer card-glow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            className="category-icon text-primary"
            animate={isHovered ? { y: -5, scale: 1.05 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {getIconComponent()}
          </motion.div>
          
          <h3 className="text-xl font-semibold mt-4">{category.name}</h3>
          
          <p className="text-sm text-muted-foreground">
            {category.description || `Explore ${category.name.toLowerCase()} tools`}
          </p>
        </div>
        
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </Link>
  );
}