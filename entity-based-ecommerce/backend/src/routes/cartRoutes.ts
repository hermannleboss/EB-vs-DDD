import { Router } from 'express';
import { CartController } from '../controllers/CartController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const cartController = new CartController();

// All routes require authentication
router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, cartController.addItem);
router.put('/:itemId', authMiddleware, cartController.updateItem);
router.delete('/:itemId', authMiddleware, cartController.removeItem);
router.delete('/', authMiddleware, cartController.clearCart);

export default router;
