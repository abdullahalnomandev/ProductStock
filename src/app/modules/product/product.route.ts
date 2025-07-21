import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router = Router();

router.post('/', ProductControllers.createProduct);
router.patch('/:id', ProductControllers.updateProduct);
router.get('/', ProductControllers.getProducts);
router.delete('/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
