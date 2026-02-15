import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class AdressageController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const adressage = await prisma.adressage.create({
        data: {
          ...req.body,
          dateRdv: req.body.dateRdv ? new Date(req.body.dateRdv) : undefined,
        },
        include: {
          medecinReferent: true,
          medecinDestinataire: true,
          patient: true,
          motif: true,
        },
      });

      res.status(201).json(adressage);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { statut, urgence, medecinId } = req.query;
      
      const where: any = {};
      
      if (statut) where.statut = statut;
      if (urgence) where.urgence = urgence;
      if (medecinId) {
        where.OR = [
          { medecinReferentId: medecinId },
          { medecinDestinataireId: medecinId },
        ];
      }

      const adressages = await prisma.adressage.findMany({
        where,
        include: {
          medecinReferent: { select: { nom: true, prenom: true, specialites: true } },
          medecinDestinataire: { select: { nom: true, prenom: true, specialites: true } },
          patient: true,
          motif: true,
        },
        orderBy: [
          { urgence: 'asc' },
          { createdAt: 'desc' },
        ],
      });

      res.json(adressages);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const adressage = await prisma.adressage.findUnique({
        where: { id: req.params.id as string },
        include: {
          medecinReferent: true,
          medecinDestinataire: true,
          patient: true,
          motif: true,
          documents: true,
        },
      });

      if (!adressage) {
        res.status(404).json({ error: 'Adressage non trouvé' });
        return;
      }

      res.json(adressage);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateStatut(req: AuthRequest, res: Response): Promise<void> {
    try {
      const adressage = await prisma.adressage.update({
        where: { id: req.params.id as string },
        data: {
          statut: req.body.statut,
          traitePar: req.body.traitePar || req.user?.username,
          traiteA: new Date(),
        },
        include: {
          medecinReferent: true,
          medecinDestinataire: true,
          patient: true,
          motif: true,
        },
      });

      res.json(adressage);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const adressageController = new AdressageController();
