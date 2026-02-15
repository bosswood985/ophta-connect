import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validators/auth.validator';
import { ZodError } from 'zod';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await authService.register(validatedData);

      res.status(201).json({
        message: 'Inscription réussie',
        user: {
          id: result.medecin.id,
          username: result.medecin.username,
          email: result.medecin.email,
          nom: result.medecin.nom,
          prenom: result.medecin.prenom,
          role: result.medecin.role,
        },
        tokens: result.tokens,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Données invalides', details: error.errors });
        return;
      }
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await authService.login(validatedData.username, validatedData.password);

      res.json({
        message: 'Connexion réussie',
        user: {
          id: result.medecin.id,
          username: result.medecin.username,
          email: result.medecin.email,
          nom: result.medecin.nom,
          prenom: result.medecin.prenom,
          role: result.medecin.role,
        },
        tokens: result.tokens,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Données invalides', details: error.errors });
        return;
      }
      res.status(401).json({ error: (error as Error).message });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = refreshTokenSchema.parse(req.body);
      const tokens = await authService.refreshToken(validatedData.refreshToken);

      res.json({ tokens });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: 'Données invalides', details: error.errors });
        return;
      }
      res.status(401).json({ error: (error as Error).message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    // In a production app, you might want to blacklist the token
    res.json({ message: 'Déconnexion réussie' });
  }
}

export const authController = new AuthController();
