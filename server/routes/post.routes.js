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
import { singleUpload } from '../config/multer.js'

const router = express.Router();

router.get('/', authUser, getAllPosts)
router.post('/', authUser, singleUpload('image'), addNewPost)
router.get('/me', authUser, getMyPosts)
router.delete('/:postId', authUser, deletePost)
router.put('/:postId/like', authUser, likePost)
router.put('/:postId/save', authUser, savePosts)
router.get('/saved', authUser, getSavedPosts)
router.get('/comments/:postId', getPostComments)
router.put('/comments/:postId', authUser, commentPost)
router.delete('/comments/:postId/:commentId', authUser, deleteComment)

export default router