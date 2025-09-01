import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  blockUnblockUser,
  deleteAccount,
  deleteProfilePicture,
  followUnfollow,
  getAllUsers,
  getProfile,
  getSuggestedUsers,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", authUser, getProfile);
router.put("/update", authUser, singleUpload("profilePicture"), updateProfile);
router.delete("/profile-picture", authUser, deleteProfilePicture);
router.put("/:id/block", authUser, blockUnblockUser);
router.put("/:id/follow", authUser, followUnfollow);
router.get("/suggested", authUser, getSuggestedUsers);
router.get("/", authUser, getAllUsers);
router.delete("/delete", authUser, deleteAccount);

export default router;
