import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  addToGroup,
  changeAdmin,
  changeDescription,
  changeGroupPicture,
  createGroupChat,
  removeFromGroup,
  renameGroup,
} from "../controllers/group.controller.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/", authUser, singleUpload("groupPicture"), createGroupChat);
router.post("/:groupId/rename", authUser, renameGroup);
router.post("/:groupId/description", authUser, changeDescription);
router.post("/:groupId/picture", authUser, changeGroupPicture);
router.post("/:groupId/add", authUser, addToGroup);
router.post("/:groupId/remove", authUser, removeFromGroup);
router.post("/:groupId/admin", authUser, changeAdmin);

export default router;
