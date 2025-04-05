import express from 'express';
import { authUser } from '../middlewares/authUser.js';
import { deleteMessage, fetchMessages, sendMessage } from '../controllers/message.controller.js';
const router = express.Router();

router.post('/:receiverId', authUser, sendMessage)
router.get('/:chatId', authUser, fetchMessages)
router.delete('/:messageId', authUser, deleteMessage)


export default router;