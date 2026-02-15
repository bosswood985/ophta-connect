import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class CourierTemplateController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { nom, contenu, variables } = req.body;
      const medecinId = req.user!.id;

      const template = await prisma.courierTemplate.create({
        data: {
          medecinId,
          nom,
          contenu,
          variables: variables || [],
        },
      });

      res.status(201).json(template);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const medecinId = req.user!.id;

      const templates = await prisma.courierTemplate.findMany({
        where: { medecinId },
        orderBy: { createdAt: 'desc' },
      });

      res.json(templates);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const medecinId = req.user!.id;

      const template = await prisma.courierTemplate.findFirst({
        where: { 
          id,
          medecinId,
        },
      });

      if (!template) {
        res.status(404).json({ error: 'Template not found' });
        return;
      }

      res.json(template);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nom, contenu, variables } = req.body;
      const medecinId = req.user!.id;

      const template = await prisma.courierTemplate.updateMany({
        where: { 
          id,
          medecinId,
        },
        data: {
          nom,
          contenu,
          variables,
        },
      });

      if (template.count === 0) {
        res.status(404).json({ error: 'Template not found' });
        return;
      }

      const updated = await prisma.courierTemplate.findUnique({
        where: { id },
      });

      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const medecinId = req.user!.id;

      const result = await prisma.courierTemplate.deleteMany({
        where: { 
          id,
          medecinId,
        },
      });

      if (result.count === 0) {
        res.status(404).json({ error: 'Template not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const courierTemplateController = new CourierTemplateController();
