import express from 'express'
import { authUser } from '../middlewares/authUser.js'
import { uploadMiddleware } from '../config/multer.js'
import {
   deleteAccount,
   followUnfollow,
   forgetPassword,
   getAllUsers,
   getProfile,
   getSuggestedUsers,
   getUser,
   login,
   logout,
   register,
   resetPassword,
   updateProfile,
   verifyOTP,
   verifyResetPasswordOTP
} from '../controllers/user.controller.js'


const router = express.Router()

router.post('/register', register)
router.post('/verifyotp', verifyOTP)
router.post('/login', login)
router.get('/logout', authUser, logout)
router.get('/profile', authUser, getUser)
router.post('/forgetPassword', forgetPassword)
router.post('/forgetPassword/verifyOTP', verifyResetPasswordOTP)
router.put('/resetPassword/email/:token', resetPassword)
router.put('/resetPassword/phone', resetPassword)
router.put('/updateProfile', authUser, uploadMiddleware, updateProfile)
router.get('/getProfile/:username', getProfile)
router.get('/suggestedUsers', authUser, getSuggestedUsers)
router.delete('/deleteAccount', authUser, deleteAccount)
router.post('/:username/follow', authUser, followUnfollow)
router.get('/allUsers', authUser, getAllUsers)

export default router