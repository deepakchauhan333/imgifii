import { Bike } from '@/lib/types';
import { BikeCard } from '@/components/bike-card';

const bikes: Bike[] = [
  {
    id: 1,
    name: 'City Cruiser',
    description: 'Comfortable bike for city rides.',
    price_per_hour: 5,
    available: true,
    image_url: '/bike1.jpg',
  },
  {
    id: 2,
    name: 'Mountain Explorer',
    description: 'Perfect for off-road adventures.',
    price_per_hour: 8,
    available: false,
    image_url: '/bike2.jpg',
  },
];

export default function BikesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
}
