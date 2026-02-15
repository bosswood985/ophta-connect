import { Router } from 'express';
import { medecinController } from '../controllers/medecin.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', medecinController.getAll.bind(medecinController));
router.get('/:id', medecinController.getById.bind(medecinController));
router.put('/:id', medecinController.update.bind(medecinController));

export default router;
