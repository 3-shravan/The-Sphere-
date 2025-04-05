import express from 'express';
import { authUser } from '../middlewares/authUser.js';
import { connections, deleteChat, getChat, } from '../controllers/chat.controller.js';
const router = express.Router();

router.get('/connections', authUser, connections)
router.get('/:userId', authUser, getChat)
router.delete('/:chatId', authUser, deleteChat)


export default router;