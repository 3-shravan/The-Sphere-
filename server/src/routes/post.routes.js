import express from "express"
import {
  commentPost,
  deleteComment,
  getPostComments,
} from "../controllers/feed/comment.controller.js"
import {
  addNewPost,
  createThoughtPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getMyPosts,
  getPostById,
  getSavedPosts,
  likePost,
  savePosts,
  updatePost,
} from "../controllers/feed/post.controller.js"
import { authUser } from "../middlewares/authUser.js"
import { grantUnknownAccess } from "../middlewares/grantUnknownAccess.js"
import { singleUpload } from "../middlewares/multer.js"
import { validate, validateRequest } from "../middlewares/validate.js"
import {
  addPostSchema,
  addThoughtSchema,
  commnetPostSchema,
  deleteCommentSchema,
  paginationSchema,
  postIdSchema,
  updatePostSchema,
} from "../validations/post.schemas.js"

const router = express.Router()

router
  .route("/")
  .all(authUser)
  .get(validateRequest(paginationSchema), getAllPosts)
  .post(singleUpload("image"), validate(addPostSchema), addNewPost)
router.get("/following", authUser, validateRequest(paginationSchema), getFollowingPosts)
router.get("/saved", authUser, getSavedPosts)
router.get("/me", authUser, validateRequest(paginationSchema), getMyPosts)
router.get("/:postId", grantUnknownAccess, validateRequest(postIdSchema), getPostById)

router.post("/thought", authUser, validate(addThoughtSchema), createThoughtPost)

router.put(
  "/:postId",
  authUser,
  singleUpload("image"),
  validateRequest(updatePostSchema),
  updatePost,
)

router.put("/:postId/like", authUser, validateRequest(postIdSchema), likePost)
router.put("/:postId/save", authUser, validateRequest(postIdSchema), savePosts)
router.delete("/:postId", authUser, validateRequest(postIdSchema), deletePost)

/***********************
 * Comments Section *
 */
router
  .route("/:postId/comments")
  .get(validateRequest(postIdSchema), getPostComments)
  .post(authUser, validateRequest(commnetPostSchema), commentPost)

router.delete(
  "/:postId/comments/:commentId",
  authUser,
  validateRequest(deleteCommentSchema),
  deleteComment,
)

export default router
