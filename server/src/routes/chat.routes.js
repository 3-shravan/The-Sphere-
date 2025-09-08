import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { singleUpload } from "../middlewares/multer.js";
import { validateRequest, validate } from "../middlewares/validate.js";
import {
  connections,
  deleteChat,
  getChat,
} from "../controllers/chats/chat.controller.js";
import {
  fetchMessages,
  sendMessage,
  deleteMessage,
} from "../controllers/chats/message.controller.js";
import {
  createGroupChat,
  updateGroup,
  changeGroupPicture,
  addToGroup,
  removeFromGroup,
  UpdateAdmin,
} from "../controllers/chats/group.controller.js";
import {
  chatIdSchema,
  deleteMessageSchema,
  fetchMessagesSchema,
  sendMessageSchema,
  addToGroupSchema,
  groupSchema,
  updateGroupSchema,
  updateGroupUsersSchema,
} from "../validations/chat.schemas.js";

const router = express.Router();

/**********************
 *      CHAT ROUTES      *
 */
router.get("/connections", authUser, connections);
router
  .route("/:chatId")
  .all(authUser, validateRequest(chatIdSchema))
  .get(getChat)
  .post(deleteChat);

/**********************
 *   MESSAGE ROUTES    *
 */
router.get(
  "/messages/:chatId",
  authUser,
  validateRequest(fetchMessagesSchema),
  fetchMessages
);
router.post(
  "/messages/:receiverId",
  authUser,
  validateRequest(sendMessageSchema),
  singleUpload("image"),
  sendMessage
);
router.delete(
  "/messages/:messageId",
  authUser,
  validateRequest(deleteMessageSchema),
  deleteMessage
);

/**********************
 *     GROUP ROUTES     *
 */
router.post(
  "/group",
  authUser,
  singleUpload("groupPicture"),
  validate(groupSchema),
  createGroupChat
);
router.patch(
  "/:chatId",
  authUser,
  validateRequest(updateGroupSchema),
  updateGroup
);
router.patch(
  "/:chatId/picture",
  authUser,
  singleUpload("groupPicture"),
  validate(chatIdSchema),
  changeGroupPicture
);
router.patch(
  "/:chatId/members",
  authUser,
  validateRequest(addToGroupSchema),
  addToGroup
);
router.patch(
  "/:chatId/members/:userId",
  authUser,
  validateRequest(updateGroupUsersSchema),
  removeFromGroup
);
router.patch(
  "/:chatId/admins/:userId",
  authUser,
  validateRequest(updateGroupUsersSchema),
  UpdateAdmin
);

export default router;
