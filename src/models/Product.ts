import mongoose, { Document, Schema } from 'mongoose';

export type IProduct = {
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  status: 'Stock Out' | 'In Stock';
  productCode: string;
  category: mongoose.Types.ObjectId;
} & Document;

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Stock Out', 'In Stock'],
    default: 'In Stock',
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
