import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class FavoriController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { type, targetId } = req.body;
      const medecinId = req.user!.userId;

      const favori = await prisma.favori.create({
        data: {
          medecinId,
          type,
          targetId,
        },
      });

      res.status(201).json(favori);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const medecinId = req.user!.userId;
      const { type } = req.query;

      const where: any = { medecinId };
      if (type) where.type = type;

      const favoris = await prisma.favori.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      res.json(favoris);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const medecinId = req.user!.userId;

      await prisma.favori.delete({
        where: { 
          id,
          medecinId, // Ensure user can only delete their own favorites
        },
      });

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async toggle(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { type, targetId } = req.body;
      const medecinId = req.user!.userId;

      // Check if favorite exists
      const existing = await prisma.favori.findUnique({
        where: {
          medecinId_type_targetId: {
            medecinId,
            type,
            targetId,
          },
        },
      });

      if (existing) {
        // Remove favorite
        await prisma.favori.delete({
          where: { id: existing.id },
        });
        res.json({ isFavorite: false });
      } else {
        // Add favorite
        await prisma.favori.create({
          data: {
            medecinId,
            type,
            targetId,
          },
        });
        res.json({ isFavorite: true });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const favoriController = new FavoriController();
