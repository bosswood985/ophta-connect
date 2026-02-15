import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { Role } from '@ophta-connect/shared';

export const roleMiddleware = (allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Non authentifié' });
      return;
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      res.status(403).json({ error: 'Accès refusé' });
      return;
    }

    next();
  };
};
