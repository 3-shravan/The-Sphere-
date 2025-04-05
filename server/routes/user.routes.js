import express from 'express'
import { authUser } from '../middlewares/authUser.js'
import { uploadMiddleware } from '../config/multer.js'
import {
   blockUnblockUser,
   deleteAccount,
   followUnfollow,
   getAllUsers,
   getProfile,
   getSuggestedUsers,
   updateProfile,
} from '../controllers/user.controller.js'


const router = express.Router()

router.get('/profile/:username', authUser, getProfile)
router.put('/update', authUser, uploadMiddleware, updateProfile)
router.put('/:id/block', authUser, blockUnblockUser)
router.put('/:id/follow', authUser, followUnfollow)
router.get('/suggested', authUser, getSuggestedUsers)
router.get('/', authUser, getAllUsers)
router.delete('/delete', authUser, deleteAccount)


export default router