import { Router } from 'express';
import { patientController } from '../controllers/patient.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', patientController.create.bind(patientController));
router.get('/', patientController.getAll.bind(patientController));
router.get('/:id', patientController.getById.bind(patientController));

export default router;
