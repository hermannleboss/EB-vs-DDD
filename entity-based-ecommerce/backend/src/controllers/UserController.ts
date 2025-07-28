import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = registerSchema.parse(req.body);

      // Check if user exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      res.status(201).json({ user, token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      // Find user
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProfile(req: Request & { userId?: string }, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProfile(req: Request & { userId?: string }, res: Response) {
    try {
      const { firstName, lastName } = req.body;

      const user = await prisma.user.update({
        where: { id: req.userId },
        data: { firstName, lastName },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAddresses(req: Request & { userId?: string }, res: Response) {
    try {
      const addresses = await prisma.address.findMany({
        where: { userId: req.userId },
      });

      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createAddress(req: Request & { userId?: string }, res: Response) {
    try {
      const { street, city, state, zipCode, country, isDefault } = req.body;

      // If this is default, unset other defaults
      if (isDefault) {
        await prisma.address.updateMany({
          where: { userId: req.userId },
          data: { isDefault: false },
        });
      }

      const address = await prisma.address.create({
        data: {
          userId: req.userId!,
          street,
          city,
          state,
          zipCode,
          country,
          isDefault,
        },
      });

      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
