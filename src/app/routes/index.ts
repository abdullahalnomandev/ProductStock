import express from 'express';
import { CategoryRoutes } from '../modules/category/category.route';
import { ProductRoutes } from '../modules/product/product.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
