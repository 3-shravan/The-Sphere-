import express from 'express';
import { authUser } from '../middlewares/authUser.js';
import { addToGroup, changeAdmin, changeDescription, changeGroupPicture, connections, createGroupChat, createOrGetChat, deleteChat, removeFromGroup, renameGroup } from '../controllers/chat.controller.js';
const router = express.Router();

router.post('/', authUser, createOrGetChat)
router.delete('/deleteChat', authUser, deleteChat)
router.get('/connections', authUser, connections)
router.post('/createGroup', authUser, createGroupChat)
router.post('/renameGroup', authUser, renameGroup)
router.post('/changeDescription', authUser, changeDescription)
router.post('/changeGroupPicture', authUser, changeGroupPicture)
router.post('/addMember', authUser, addToGroup)
router.post('/removeMember', authUser, removeFromGroup)
router.post('/changeAdmin', authUser, changeAdmin)



export default router;