import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import prisma from '../config/database';
import logger from '../utils/logger';

export const auditMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const originalSend = res.send;

  res.send = function (data: any): Response {
    res.send = originalSend;
    
    // Log the action after response is sent
    setImmediate(async () => {
      try {
        await prisma.auditLog.create({
          data: {
            medecinId: req.user?.userId,
            action: `${req.method} ${req.path}`,
            details: {
              body: req.body,
              query: req.query,
              params: req.params,
            },
            ipAddress: req.ip || req.socket.remoteAddress,
          },
        });
      } catch (error) {
        logger.error('Erreur lors de l\'audit:', error);
      }
    });

    return originalSend.call(this, data);
  };

  next();
};
