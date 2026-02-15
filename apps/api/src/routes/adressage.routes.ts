import { Router } from 'express';
import { adressageController } from '../controllers/adressage.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', adressageController.create.bind(adressageController));
router.get('/', adressageController.getAll.bind(adressageController));
router.get('/:id', adressageController.getById.bind(adressageController));
router.patch('/:id/statut', adressageController.updateStatut.bind(adressageController));

export default router;
