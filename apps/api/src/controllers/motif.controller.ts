import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class MotifController {
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const motifs = await prisma.motifAdressage.findMany({
        where: { actif: true },
        orderBy: { ordre: 'asc' },
      });

      res.json(motifs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const motif = await prisma.motifAdressage.create({
        data: req.body,
      });

      res.status(201).json(motif);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const motifController = new MotifController();
