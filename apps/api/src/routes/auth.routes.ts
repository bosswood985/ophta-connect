import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { strictRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', strictRateLimiter, authController.register.bind(authController));
router.post('/login', strictRateLimiter, authController.login.bind(authController));
router.post('/refresh', authController.refresh.bind(authController));
router.post('/logout', authController.logout.bind(authController));

export default router;
