'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import supabase from '@/lib/supabase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  website_url: z.string().url('Must be a valid URL'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  email: z.string().email('Must be a valid email'),
  category_id: z.string().min(1, 'Please select a category')
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      website_url: '',
      description: '',
      email: '',
      category_id: ''
    }
  });
  
  // Fetch categories on component mount
  useState(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('id, name');
      if (data) setCategories(data);
    }
    
    fetchCategories();
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    
    try {
      // Generate a slug from the name
      const slug = data.name
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      const { error } = await supabase.from('tools').insert([
        {
          name: data.name,
          slug,
          description: data.description,
          website_url: data.website_url,
          category_id: parseInt(data.category_id),
          rating: 0 // Default rating for new submissions
        }
      ]);
      
      if (error) throw error;
      
      toast.success('Tool submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting tool:', error);
      toast.error('Failed to submit tool. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Submit an AI Tool</h1>
        <p className="text-muted-foreground mb-8">
          Have an AI tool that should be featured in our directory? Fill out the form below to submit it for review.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Tool Name</Label>
            <Input
              id="name"
              placeholder="e.g., GPT Assistant"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL</Label>
            <Input
              id="website_url"
              placeholder="https://example.com"
              {...register('website_url')}
            />
            {errors.website_url && (
              <p className="text-sm text-destructive">{errors.website_url.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what your tool does and why it's useful..."
              rows={4}
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category_id">Category</Label>
            <select
              id="category_id"
              className="w-full p-2 rounded-md border border-input bg-background"
              {...register('category_id')}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-sm text-destructive">{errors.category_id.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Tool'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}