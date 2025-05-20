import express from 'express'
import { authUser } from '../middlewares/authUser.js'
import { singleUpload } from '../config/multer.js'
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
router.put('/update', authUser, singleUpload('profilePicture'), updateProfile)
router.put('/:id/block', authUser, blockUnblockUser)
router.put('/:id/follow', authUser, followUnfollow)
router.get('/suggested', authUser, getSuggestedUsers)
router.get('/', authUser, getAllUsers)
router.delete('/delete', authUser, deleteAccount)


export default router