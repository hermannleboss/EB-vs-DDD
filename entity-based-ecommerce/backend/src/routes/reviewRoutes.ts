import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const reviewController = new ReviewController();

// Public routes
router.get('/product/:productId', reviewController.getProductReviews);

// Protected routes
router.post('/', authMiddleware, reviewController.create);
router.put('/:id', authMiddleware, reviewController.update);
router.delete('/:id', authMiddleware, reviewController.delete);

export default router;
