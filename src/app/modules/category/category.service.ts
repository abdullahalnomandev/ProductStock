import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: ICategory): Promise<ICategory> => {
  const newCategory = await Category.create(payload);
  return newCategory;
};

const getCategories = async (): Promise<ICategory[]> => {
  const categories = await Category.find();
  return categories;
};

export const CategoryService = {
  createCategory,
  getCategories,
};
