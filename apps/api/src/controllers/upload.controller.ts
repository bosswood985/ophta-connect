import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../config/database';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${randomUUID()}-${basename}${ext}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
    'application/dicom',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non supporté. Formats acceptés: JPEG, PNG, PDF, DICOM'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export class UploadController {
  async uploadAdressageAttachment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const adressageId = req.params.adressageId as string;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const attachment = await prisma.adressageAttachment.create({
        data: {
          adressageId,
          nomFichier: file.originalname,
          cheminStockage: file.path,
          typeMime: file.mimetype,
          tailleFichier: file.size,
          uploadeParId: req.user!.userId,
        },
      });

      res.status(201).json(attachment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async uploadMessageAttachment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const messageId = req.params.messageId as string;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const attachment = await prisma.messageAttachment.create({
        data: {
          messageId,
          nomFichier: file.originalname,
          cheminStockage: file.path,
          typeMime: file.mimetype,
          tailleFichier: file.size,
        },
      });

      res.status(201).json(attachment);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async downloadAttachment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const type = req.params.type as string;

      let attachment: { cheminStockage: string; nomFichier: string } | null = null;
      
      if (type === 'adressage') {
        attachment = await prisma.adressageAttachment.findUnique({
          where: { id },
          select: { cheminStockage: true, nomFichier: true },
        });
      } else if (type === 'message') {
        attachment = await prisma.messageAttachment.findUnique({
          where: { id },
          select: { cheminStockage: true, nomFichier: true },
        });
      }

      if (!attachment) {
        res.status(404).json({ error: 'Attachment not found' });
        return;
      }

      if (!fs.existsSync(attachment.cheminStockage)) {
        res.status(404).json({ error: 'File not found on server' });
        return;
      }

      res.download(attachment.cheminStockage, attachment.nomFichier);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getAdressageAttachments(req: AuthRequest, res: Response): Promise<void> {
    try {
      const adressageId = req.params.adressageId as string;

      const attachments = await prisma.adressageAttachment.findMany({
        where: { adressageId },
        orderBy: { createdAt: 'desc' },
      });

      res.json(attachments);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteAttachment(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const type = req.params.type as string;

      let attachment: { cheminStockage: string; uploadeParId?: string } | null = null;
      
      if (type === 'adressage') {
        attachment = await prisma.adressageAttachment.findUnique({
          where: { id },
          select: { cheminStockage: true, uploadeParId: true },
        });
        
        if (attachment && attachment.uploadeParId !== req.user!.userId) {
          res.status(403).json({ error: 'Not authorized to delete this attachment' });
          return;
        }
        
        await prisma.adressageAttachment.delete({
          where: { id },
        });
      } else if (type === 'message') {
        attachment = await prisma.messageAttachment.findUnique({
          where: { id },
          select: { cheminStockage: true },
        });
        
        await prisma.messageAttachment.delete({
          where: { id },
        });
      }

      if (!attachment) {
        res.status(404).json({ error: 'Attachment not found' });
        return;
      }

      // Delete file from filesystem
      if (fs.existsSync(attachment.cheminStockage)) {
        fs.unlinkSync(attachment.cheminStockage);
      }

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

export const uploadController = new UploadController();
