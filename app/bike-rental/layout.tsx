import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Bike Rental',
};

export default function BikeRentalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Bike Rental</h1>
      {children}
    </div>
  );
}
