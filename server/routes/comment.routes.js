import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  commentPost,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/:postId", authUser, commentPost);
router.delete("/:postId/:commentId", authUser, deleteComment);

export default router;
