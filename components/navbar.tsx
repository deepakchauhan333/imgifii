'use client';

import Link from 'next/link';
import { Bot, TrendingUp, PlusCircle, Grid, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const navItems = [
    { icon: Grid, label: 'Categories', href: '/categories' },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
    { icon: PlusCircle, label: 'New', href: '/new' },
    { icon: Bot, label: 'Compare', href: '/compare' },
    { icon: Package, label: 'Bundles', href: '/bundles' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-[#0F0627] border-r border-[#1E1145] flex flex-col items-center py-8 z-50">
      <Link href="/" className="mb-12">
        <img src="/logo.png" alt="AIToonic" className="w-10 h-10" />
      </Link>

      <div className="flex flex-col space-y-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center text-center group"
          >
            <div className={cn(
              "p-3 rounded-xl transition-all duration-200",
              "hover:bg-[#2A1B54] hover:text-[#8B5CF6]",
              "group-hover:scale-110"
            )}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-xs mt-1 text-gray-400 group-hover:text-[#8B5CF6]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}