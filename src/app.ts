import cors from 'cors';
import express, { Application } from 'express';
import { CategoryRoutes } from './app/modules/category/category.route';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.status(200).send('Welcome to the Product Management API!');
});

app.use('/api/v1/products', ProductRoutes);
app.use('/api/v1/categories', CategoryRoutes);

export default app;
