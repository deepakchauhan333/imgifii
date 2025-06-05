'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BoxIcon } from 'lucide-react';

export function SubmitSection() {
  return (
    <section className="relative">
      <motion.div 
        className="rounded-xl bg-card/80 backdrop-blur-sm border border-border/60 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="w-full md:w-3/4 text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Submit your AI tool</h2>
          <p className="text-muted-foreground">
            Have an amazing AI tool that should be featured in our directory? Submit it now and reach thousands of potential users.
          </p>
        </motion.div>
        
        <motion.div
          className="w-full md:w-1/4 flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-70 blur-sm rounded-full"></div>
            <Link href="/submit">
              <Button className="relative bg-primary hover:bg-primary/90 text-white px-6 py-6 h-auto rounded-full text-lg">
                Submit
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}