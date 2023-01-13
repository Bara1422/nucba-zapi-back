import { Products } from '../entities/products';

export interface CategoryDto {
  id: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  products: Products[];
}
