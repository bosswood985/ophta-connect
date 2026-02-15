import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class PatientController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const patient = await prisma.patient.create({
        data: req.body,
      });

      res.status(201).json(patient);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { search } = req.query;
      
      const patients = await prisma.patient.findMany({
        where: search
          ? {
              OR: [
                { nom: { contains: search as string, mode: 'insensitive' } },
                { prenom: { contains: search as string, mode: 'insensitive' } },
              ],
            }
          : undefined,
        orderBy: { createdAt: 'desc' },
        take: 100,
      });

      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: req.params.id },
        include: { adressages: true },
      });

      if (!patient) {
        res.status(404).json({ error: 'Patient non trouvé' });
        return;
      }

      res.json(patient);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export const patientController = new PatientController();
