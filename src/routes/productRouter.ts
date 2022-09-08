import express from 'express';
import {
  CreateProductController,
  IndexProductController,
  ShowProductController,
  DeleteProductController,
  UpdateProductController,
} from '../controllers/productController';

import { authenticateToken } from '../middleware/authinticateToken';

const productRouter = express.Router();

productRouter.get('/index', IndexProductController);
productRouter.post('/create', authenticateToken, CreateProductController); //need auth
productRouter.delete('/delete', authenticateToken, DeleteProductController); //need auth
productRouter.put('/update', authenticateToken, UpdateProductController);
productRouter.get('/show', ShowProductController);

export default productRouter;
