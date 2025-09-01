import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  deleteMessage,
  fetchMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/:chatId", authUser, fetchMessages);
router.post("/", authUser, singleUpload("image"), sendMessage);
router.delete("/:messageId", authUser, deleteMessage);

export default router;
