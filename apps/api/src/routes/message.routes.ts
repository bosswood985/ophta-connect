import { Router } from 'express';
import { messageController } from '../controllers/message.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', messageController.send.bind(messageController));
router.get('/conversations', messageController.getConversations.bind(messageController));
router.get('/unread-count', messageController.getUnreadCount.bind(messageController));
router.get('/conversation/:userId', messageController.getConversation.bind(messageController));
router.patch('/:id/read', messageController.markAsRead.bind(messageController));

export default router;
