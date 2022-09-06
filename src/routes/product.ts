import express from 'express';
import {
  CreateProductController,
  IndexProductController,
  ShowProductController,
  DeleteProductController,
} from '../controllers/product';

const router = express.Router();

router.get('/index', IndexProductController);
router.post('/create', CreateProductController); //need auth
router.delete('/delete', DeleteProductController); //need auth
router.get('/show', ShowProductController);

export default router;
