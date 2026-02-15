import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class MedecinController {
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { specialite } = req.query;
      
      const medecins = await prisma.medecin.findMany({
        where: {
          actif: true,
          ...(specialite && { specialites: { has: specialite as string } }),
        },
        select: {
          id: true,
          username: true,
          nom: true,
          prenom: true,
          specialites: true,
          telephone: true,
          doctolibUrl: true,
          delaiIntervention: true,
          role: true,
        },
        orderBy: { nom: 'asc' },
      });

      res.json(medecins);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const medecin = await prisma.medecin.findUnique({
        where: { id: req.params.id as string },
        select: {
          id: true,
          username: true,
          email: true,
          nom: true,
          prenom: true,
          rpps: true,
          specialites: true,
          telephone: true,
          doctolibUrl: true,
          delaiIntervention: true,
          role: true,
          actif: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!medecin) {
        res.status(404).json({ error: 'Médecin non trouvé' });
        return;
      }

      res.json(medecin);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const medecin = await prisma.medecin.update({
        where: { id: req.params.id as string },
        data: req.body,
        select: {
          id: true,
          username: true,
          email: true,
          nom: true,
          prenom: true,
          rpps: true,
          specialites: true,
          telephone: true,
          doctolibUrl: true,
          delaiIntervention: true,
          role: true,
          actif: true,
        },
      });

      res.json(medecin);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const medecinController = new MedecinController();
