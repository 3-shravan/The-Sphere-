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
} from "../controllers/post.controller.js";
import { authUser } from "../middlewares/authUser.js";
import { singleUpload } from "../config/multer.js";

const router = express.Router();

router.get("/", authUser, getAllPosts);
router.get("/following", authUser, getFollowingPosts);
router.get("/saved", authUser, getSavedPosts);
router.post("/", authUser, singleUpload("image"), addNewPost);
router.get("/me", authUser, getMyPosts);
router.get("/:postId", authUser, getPostById);
router.put("/:postId/like", authUser, likePost);
router.put("/:postId/save", authUser, savePosts);
router.delete("/:postId", authUser, deletePost);

export default router;
