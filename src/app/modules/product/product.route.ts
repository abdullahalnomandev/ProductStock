import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidation } from './product.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductControllers.createProduct
);
router.patch('/:id', ProductControllers.updateProduct);
router.get('/', ProductControllers.getProducts);
router.delete('/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
