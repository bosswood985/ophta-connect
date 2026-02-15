import { Router } from 'express';
import { uploadController, upload } from '../controllers/upload.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

// Upload endpoints
router.post(
  '/adressage/:adressageId',
  upload.single('file'),
  uploadController.uploadAdressageAttachment.bind(uploadController)
);

router.post(
  '/message/:messageId',
  upload.single('file'),
  uploadController.uploadMessageAttachment.bind(uploadController)
);

// Get attachments
router.get(
  '/adressage/:adressageId',
  uploadController.getAdressageAttachments.bind(uploadController)
);

// Download attachment
router.get(
  '/download/:type/:id',
  uploadController.downloadAttachment.bind(uploadController)
);

// Delete attachment
router.delete(
  '/:type/:id',
  uploadController.deleteAttachment.bind(uploadController)
);

export default router;
