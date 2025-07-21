/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '../category/category.model';
import { productSearchableFields } from './product.cconst';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import { generateProductCode } from './product.utils';

// CREATE PRODUCT
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

const getProducts = async (
  filters: any,
  paginationOptions: any
): Promise<{
  meta: { page: number; limit: number; total: number };
  data: IProduct[];
}> => {
  const { searchTerm, category, ...filtersData } = filters;
  const andConditions = [];

  // Handle search term filtering
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // Handle additional filters
  if (category) {
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      throw new Error('Category not found.');
    }
    andConditions.push({ category: existingCategory._id });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Extract pagination details
  const { page, limit, skip } = paginationOptions;

  // Query products with filters and pagination
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const products = await Product.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .populate('category');

  // Get total product count
  const total = await Product.countDocuments(whereConditions);

  return {
    meta: { page, limit, total },
    data: products.map(product => {
      const originalPrice = product.price;
      const finalPrice =
        product.price - (product.price * (product.discount || 0)) / 100;
      return { ...product.toObject(), originalPrice, finalPrice };
    }),
  };
};

// UPDATE PRODUCT
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

// DELETE PRODUCT
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
