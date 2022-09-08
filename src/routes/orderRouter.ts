import express from 'express';
import {
  changeOrderStatusController,
  CreateOrderController,
  DeleteOrderController,
  GetMyOrders,
  GetOrderProducts,
  GetUserOrdersController,
} from '../controllers/orderController';

import { authenticateToken } from '../middleware/authinticateToken';

const orderRouter = express.Router();

orderRouter.post('/create', authenticateToken, CreateOrderController);
orderRouter.delete('/delete', authenticateToken, DeleteOrderController); //need auth
orderRouter.get('/myorders', authenticateToken, GetMyOrders);
orderRouter.get('/products', authenticateToken, GetOrderProducts);
orderRouter.put('/newstatus', authenticateToken, changeOrderStatusController);

export default orderRouter;
