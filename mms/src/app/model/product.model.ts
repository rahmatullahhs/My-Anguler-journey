export interface Product {
  id: number;
  name: string;
  type: 'computer' | 'laptop';
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  graphicsCard?: string;
  screenSize?: string; // useful for laptops
  batteryLife?: string; // useful for laptops
  price: number;
  inStock: boolean;
  imageUrl?: string;
  description?: string;
}
