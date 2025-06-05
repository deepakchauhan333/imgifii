'use client';

import { motion } from 'framer-motion';
import { SearchInput } from '@/components/search-input';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-16 pb-24 md:pb-32 pl-24">
      <motion.div 
        className="max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Discover<br />
          the Best AI Tools
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl">
          Explore the top AI tools for your business and productivity
        </p>
        
        <div className="max-w-2xl">
          <SearchInput />
        </div>
      </motion.div>
    </div>
  );
}