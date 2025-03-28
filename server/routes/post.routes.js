import express from 'express';
import {
   addNewPost,
   commentPost,
   deleteComment,
   deletePost,
   getAllPosts,
   getMyPosts,
   getPostComments,
   getSavedPosts,
   likePost,
   savePosts
} from '../controllers/post.controller.js';
import { authUser } from '../middlewares/authUser.js';
import { uploadMiddleware } from '../config/multer.js'

const router = express.Router();

router.post('/createPost', authUser, uploadMiddleware, addNewPost)
router.get('/', authUser, getAllPosts)
router.get('/myPosts/', authUser, getMyPosts)
router.delete('/deletePost/:postId', authUser, deletePost)
router.put('/likePost/:postId', authUser, likePost)
router.put('/commentPost/:postId', authUser, commentPost)
router.get('/getPostComments/:postId', getPostComments)
router.delete('/deleteComment/:postId/:commentId', authUser, deleteComment)
router.put('/savePost/:postId', authUser, savePosts)
router.get('/savedPosts', authUser, getSavedPosts)


export default router