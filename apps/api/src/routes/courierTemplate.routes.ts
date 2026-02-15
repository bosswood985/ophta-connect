import { Router } from 'express';
import { courierTemplateController } from '../controllers/courierTemplate.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', courierTemplateController.create.bind(courierTemplateController));
router.get('/', courierTemplateController.getAll.bind(courierTemplateController));
router.get('/:id', courierTemplateController.getById.bind(courierTemplateController));
router.put('/:id', courierTemplateController.update.bind(courierTemplateController));
router.delete('/:id', courierTemplateController.delete.bind(courierTemplateController));

export default router;
