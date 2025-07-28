import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();
const categoryController = new CategoryController();

// Public routes
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, categoryController.create);
router.put('/:id', authMiddleware, adminMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete);

export default router;
