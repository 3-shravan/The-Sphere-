import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  blockUnblockUser,
  deleteAccount,
  deleteProfilePicture,
  followUnfollow,
  getAllUsers,
  getProfiles,
  getSuggestedUsers,
  myProfile,
  todayBirthdays,
  updateProfile,
} from "../controllers/user.controller.js";
import { validate, validateRequest } from "../middlewares/validate.js";
import { idParam, querySearch } from "../validations/global.schemas.js";
import {
  getProfileSchema,
  updateProfileSchema,
} from "../validations/user.schemas.js";

const router = express.Router();

router.get("/", authUser, validateRequest(querySearch), getAllUsers);
router.get("/suggested", authUser, getSuggestedUsers);
router.get("/birthdays", authUser, todayBirthdays);
router.get("/profile", authUser, myProfile);
router.get(
  "/profile/:username",
  authUser,
  validateRequest(getProfileSchema),
  getProfiles
);
router.put(
  "/update",
  authUser,
  singleUpload("profilePicture"),
  validate(updateProfileSchema),
  updateProfile
);
router.put("/:id/follow", authUser, validateRequest(idParam), followUnfollow);
router.put("/:id/block", authUser, validateRequest(idParam), blockUnblockUser);
router.delete("/profile-picture", authUser, deleteProfilePicture);
router.delete("/delete", authUser, deleteAccount);

export default router;
