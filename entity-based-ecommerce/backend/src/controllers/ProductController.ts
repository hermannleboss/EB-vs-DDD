import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  imageUrl: z.string().url().optional(),
  categoryId: z.string(),
});

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, search, categoryId } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const where: any = {};
      if (search) {
        where.name = { contains: search, mode: 'insensitive' };
      }
      if (categoryId) {
        where.categoryId = categoryId;
      }

      const products = await prisma.product.findMany({
        where,
        include: {
          category: true,
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        skip,
        take: Number(limit),
      });

      const total = await prisma.product.count({ where });

      // Calculate average rating for each product
      const productsWithRating = products.map(product => ({
        ...product,
        averageRating: product.reviews.length > 0 
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0,
        reviewCount: product.reviews.length,
        reviews: undefined, // Remove reviews array from response
      }));

      res.json({
        products: productsWithRating,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          reviews: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const averageRating = product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;

      res.json({
        ...product,
        averageRating,
        reviewCount: product.reviews.length,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const products = await prisma.product.findMany({
        where: { categoryId },
        include: {
          category: true,
          reviews: {
            select: {
              rating: true,
            },
          },
        },
        skip,
        take: Number(limit),
      });

      const total = await prisma.product.count({ where: { categoryId } });

      const productsWithRating = products.map(product => ({
        ...product,
        averageRating: product.reviews.length > 0 
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0,
        reviewCount: product.reviews.length,
        reviews: undefined,
      }));

      res.json({
        products: productsWithRating,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = productSchema.parse(req.body);

      const product = await prisma.product.create({
        data,
        include: {
          category: true,
        },
      });

      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = productSchema.partial().parse(req.body);

      const product = await prisma.product.update({
        where: { id },
        data,
        include: {
          category: true,
        },
      });

      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.product.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
