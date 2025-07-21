/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '../category/category.model';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import { generateProductCode } from './product.utils';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const { name, category: categoryId } = payload;

  // Validate category
  const existingCategory = await Category.findById(categoryId);
  if (!existingCategory) {
    throw new Error('Invalid category provided.');
  }

  const productCode = generateProductCode(name);
  const newProduct = await Product.create({ ...payload, productCode });
  return newProduct;
};

const getProducts = async (filters: any): Promise<IProduct[]> => {
  const { searchTerm, category } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
    });
  }

  if (category) {
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      throw new Error('Category not found.');
    }
    andConditions.push({ category: existingCategory._id });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const products = await Product.find(whereConditions).populate('category');

  return products.map(product => {
    const originalPrice = product.price;
    const finalPrice =
      product.price - (product.price * (product.discount || 0)) / 100;
    return { ...product.toObject(), originalPrice, finalPrice };
  });
};

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const { category: categoryId, ...updateData } = payload;

  if (categoryId) {
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      throw new Error('Invalid category provided.');
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate('category');
  return updatedProduct;
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const deletedProduct = await Product.findByIdAndDelete(id).populate(
    'category'
  );
  return deletedProduct;
};

export const ProductService = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
