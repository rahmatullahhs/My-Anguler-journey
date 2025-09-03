import { ProductModel } from "./product.model";

export interface CartModel  {

 id: number;            // Product ID from the backend
  name: string;
  price: number;
  quantity: number;
  category?: string;
  brand?: string;
  model?: string;
  details?: string;
  
  
}

