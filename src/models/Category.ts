import mongoose, { Document, Schema } from 'mongoose';

export type ICategory = {
  name: string;
} & Document;

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export default mongoose.model<ICategory>('Category', CategorySchema);
