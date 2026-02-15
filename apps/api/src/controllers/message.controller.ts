import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';

export class MessageController {
  async send(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { receiverId, contenu, adressageId } = req.body;
      const senderId = req.user!.userId;

      const message = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          contenu,
          adressageId: adressageId || null,
        },
        include: {
          sender: {
            select: { id: true, nom: true, prenom: true, specialites: true },
          },
          receiver: {
            select: { id: true, nom: true, prenom: true, specialites: true },
          },
        },
      });

      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getConversations(req: AuthRequest, res: Response): Promise<void> {
    try {
      const medecinId = req.user!.userId;

      // Get all unique conversations
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: medecinId },
            { receiverId: medecinId },
          ],
        },
        include: {
          sender: {
            select: { id: true, nom: true, prenom: true, specialites: true },
          },
          receiver: {
            select: { id: true, nom: true, prenom: true, specialites: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      // Group by conversation partner
      const conversationsMap = new Map();
      
      messages.forEach((message) => {
        const partnerId = message.senderId === medecinId 
          ? message.receiverId 
          : message.senderId;
        
        if (!conversationsMap.has(partnerId)) {
          conversationsMap.set(partnerId, {
            partner: message.senderId === medecinId 
              ? message.receiver 
              : message.sender,
            lastMessage: message,
            unreadCount: 0,
          });
        }

        // Count unread messages
        if (message.receiverId === medecinId && !message.lu) {
          const conv = conversationsMap.get(partnerId);
          conv.unreadCount++;
        }
      });

      const conversations = Array.from(conversationsMap.values());
      res.json(conversations);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getConversation(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.userId as string;
      const medecinId = req.user!.userId;

      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: medecinId, receiverId: userId },
            { senderId: userId, receiverId: medecinId },
          ],
        },
        include: {
          sender: {
            select: { id: true, nom: true, prenom: true, specialites: true },
          },
          receiver: {
            select: { id: true, nom: true, prenom: true, specialites: true },
          },
          attachments: true,
          adressage: {
            select: { id: true, patient: true, motif: true },
          },
        },
        orderBy: { createdAt: 'asc' },
      });

      // Mark messages as read
      await prisma.message.updateMany({
        where: {
          senderId: userId,
          receiverId: medecinId,
          lu: false,
        },
        data: { lu: true },
      });

      res.json(messages);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async markAsRead(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const medecinId = req.user!.userId;

      const message = await prisma.message.updateMany({
        where: {
          id,
          receiverId: medecinId,
        },
        data: { lu: true },
      });

      if (message.count === 0) {
        res.status(404).json({ error: 'Message not found' });
        return;
      }

      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getUnreadCount(req: AuthRequest, res: Response): Promise<void> {
    try {
      const medecinId = req.user!.userId;

      const count = await prisma.message.count({
        where: {
          receiverId: medecinId,
          lu: false,
        },
      });

      res.json({ count });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const messageController = new MessageController();
