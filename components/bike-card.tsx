'use client';

import Image from 'next/image';
import { Bike } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BikeCardProps {
  bike: Bike;
  onRent?: (bike: Bike) => void;
}

export function BikeCard({ bike, onRent }: BikeCardProps) {
  return (
    <Card className="p-4 flex flex-col items-center gap-4">
      {bike.image_url && (
        <Image
          src={bike.image_url}
          alt={bike.name}
          width={200}
          height={120}
          className="object-cover rounded"
        />
      )}
      <h3 className="text-lg font-semibold">{bike.name}</h3>
      <p className="text-sm text-muted-foreground text-center line-clamp-2">
        {bike.description}
      </p>
      <div className="mt-auto flex w-full justify-between items-center">
        <span className="font-medium">${{bike.price_per_hour}}/hr</span>
        <Button disabled={!bike.available} onClick={() => onRent?.(bike)}>
          {bike.available ? 'Rent' : 'Unavailable'}
        </Button>
      </div>
    </Card>
  );
}
