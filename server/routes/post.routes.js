import express from "express";
import {
  addNewPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getMyPosts,
  getPostById,
  getSavedPosts,
  likePost,
  savePosts,
  updatePost,
} from "../controllers/post.controller.js";
import { authUser } from "../middlewares/authUser.js";
import { grantUnknownAccess } from "../middlewares/grantUnknownAccess.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", authUser, getAllPosts);
router.get("/following", authUser, getFollowingPosts);
router.get("/me", authUser, getMyPosts);
router.get("/saved", authUser, getSavedPosts);
router.get("/:postId", grantUnknownAccess, getPostById);
router.post("/", authUser, singleUpload("image"), addNewPost);
router.put("/:postId", authUser, singleUpload("image"), updatePost);
router.put("/:postId/like", authUser, likePost);
router.put("/:postId/save", authUser, savePosts);
router.delete("/:postId", authUser, deletePost);

export default router;
