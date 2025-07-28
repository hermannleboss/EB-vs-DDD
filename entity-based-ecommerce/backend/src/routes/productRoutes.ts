import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();
const productController = new ProductController();

// Public routes
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.get('/category/:categoryId', productController.getByCategory);

// Protected routes (admin only)
router.post('/', authMiddleware, adminMiddleware, productController.create);
router.put('/:id', authMiddleware, adminMiddleware, productController.update);
router.delete('/:id', authMiddleware, adminMiddleware, productController.delete);

export default router;
