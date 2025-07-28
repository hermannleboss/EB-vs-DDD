import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const orderController = new OrderController();

// All routes require authentication
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getById);
router.post('/', authMiddleware, orderController.create);
router.put('/:id/status', authMiddleware, orderController.updateStatus);

export default router;
