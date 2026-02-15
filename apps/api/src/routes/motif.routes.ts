import { Router } from 'express';
import { motifController } from '../controllers/motif.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', motifController.getAll.bind(motifController));
router.post('/', motifController.create.bind(motifController));

export default router;
