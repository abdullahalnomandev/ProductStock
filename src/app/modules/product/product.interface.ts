import { Types } from 'mongoose';
import { ICategory } from '../category/category.interface';

export type IProduct = {
  name: string;
  description: string;
  price: number;
  discount?: number; // percentage (e.g., 10 for 10%)
  image: string; // URL
  status: 'in_stock' | 'out_of_stock';
  productCode: string; // auto-generated unique ID
  category: Types.ObjectId | ICategory; // Reference to Category
};
