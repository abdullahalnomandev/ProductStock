import { Schema, model } from 'mongoose';
import { ICategory } from './product.interface';

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<ICategory>('Category', CategorySchema);
