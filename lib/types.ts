export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon_url?: string;
  created_at: string;
}

export interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo_url?: string;
  website_url: string;
  category_id: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Bike {
  id: number;
  name: string;
  image_url?: string;
  description: string;
  price_per_hour: number;
  available: boolean;
}