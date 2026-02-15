import { Router } from 'express';
import { favoriController } from '../controllers/favori.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', favoriController.create.bind(favoriController));
router.post('/toggle', favoriController.toggle.bind(favoriController));
router.get('/', favoriController.getAll.bind(favoriController));
router.delete('/:id', favoriController.delete.bind(favoriController));

export default router;
