import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { products: true },
          },
        },
      });

      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = categorySchema.parse(req.body);

      const category = await prisma.category.create({
        data,
      });

      res.status(201).json(category);
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
      const data = categorySchema.partial().parse(req.body);

      const category = await prisma.category.update({
        where: { id },
        data,
      });

      res.json(category);
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

      await prisma.category.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
