import express from "express"
import { connections, deleteChat, getChat } from "../controllers/chats/chat.controller.js"
import {
  addToGroup,
  changeGroupPicture,
  createGroupChat,
  removeFromGroup,
  UpdateAdmin,
  updateGroup,
} from "../controllers/chats/group.controller.js"
import {
  deleteMessage,
  fetchMessages,
  sendMessage,
} from "../controllers/chats/message.controller.js"
import { authUser } from "../middlewares/authUser.js"
import { singleUpload } from "../middlewares/multer.js"
import { validate, validateRequest } from "../middlewares/validate.js"
import {
  addToGroupSchema,
  chatIdSchema,
  deleteMessageSchema,
  fetchMessagesSchema,
  groupSchema,
  sendMessageSchema,
  updateGroupSchema,
  updateGroupUsersSchema,
} from "../validations/chat.schemas.js"

const router = express.Router()

/**********************
 *      CHAT ROUTES      *
 */
router.get("/connections", authUser, connections)
router.route("/:chatId").all(authUser, validateRequest(chatIdSchema)).get(getChat).post(deleteChat)

/**********************
 *   MESSAGE ROUTES    *
 */
router.get("/:chatId/messages", authUser, validateRequest(fetchMessagesSchema), fetchMessages)
router.post(
  "/:receiverId/message",
  authUser,
  validateRequest(sendMessageSchema),
  singleUpload("image"),
  sendMessage,
)
router.delete("/message/:messageId", authUser, validateRequest(deleteMessageSchema), deleteMessage)

/**********************
 *     GROUP ROUTES     *
 */
router.post(
  "/group",
  authUser,
  singleUpload("groupPicture"),
  validate(groupSchema),
  createGroupChat,
)
router.patch("/:chatId", authUser, validateRequest(updateGroupSchema), updateGroup)
router.patch(
  "/:chatId/picture",
  authUser,
  singleUpload("groupPicture"),
  validate(chatIdSchema),
  changeGroupPicture,
)
router.patch("/:chatId/members", authUser, validateRequest(addToGroupSchema), addToGroup)
router.patch(
  "/:chatId/members/:userId",
  authUser,
  validateRequest(updateGroupUsersSchema),
  removeFromGroup,
)
router.patch(
  "/:chatId/admins/:userId",
  authUser,
  validateRequest(updateGroupUsersSchema),
  UpdateAdmin,
)

export default router
