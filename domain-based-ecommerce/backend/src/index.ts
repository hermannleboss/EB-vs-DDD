import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Domain-specific route imports
import { userRoutes } from './domains/user/infrastructure/routes';
import { productRoutes } from './domains/product/infrastructure/routes';
import { orderRoutes } from './domains/order/infrastructure/routes';
import { cartRoutes } from './domains/cart/infrastructure/routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Domain-based routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Domain-based E-commerce API is running' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Domain-based E-commerce server running on port ${PORT}`);
});

export { prisma };
