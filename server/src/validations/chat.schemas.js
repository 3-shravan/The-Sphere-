import Joi from "joi"
import { objectId, paginationSchemaObject } from "./global.schemas.js"

/**
 * 📩 Send Message
 * Either content or image (req.file handled separately) must be provided
 */
export const sendMessageSchema = Joi.object({
  params: Joi.object({
    receiverId: objectId("receiverId"),
  }),
  body: Joi.object({
    content: Joi.string().trim().max(5000).allow("", null),
  }),
})

/**
 * 💬 Fetch Messages with Pagination
 * page and limit are optional query parameters with default values
 */
export const fetchMessagesSchema = Joi.object({
  params: Joi.object({
    chatId: objectId("chatId"),
  }),
  query: paginationSchemaObject(),
})

export const deleteMessageSchema = Joi.object({
  params: Joi.object({
    messageId: objectId("messageId"),
  }),
})

export const chatIdSchema = Joi.object({
  params: Joi.object({
    chatId: objectId("chatId"),
  }),
})

export const groupSchema = Joi.object({
  groupName: Joi.string().trim().min(3).max(20).required(),
  groupDescription: Joi.string().trim().max(100).allow("", null),
  users: Joi.array().items(objectId("userId")).min(2).max(50).required().messages({
    "array.base": "users must be an array of user IDs.",
    "array.min": "Group must have at least {#limit} members.",
    "array.max": "Group can have a maximum of {#limit} members.",
    "any.required": "Please provide a group name and users.",
  }),
})
export const updateGroupSchema = Joi.object({
  params: Joi.object({
    chatId: objectId("chatId"),
  }),
  body: Joi.object({
    groupName: Joi.string().trim().min(3).max(20).required(),
    groupDescription: Joi.string().trim().max(100).allow("", null),
  }),
})
export const addToGroupSchema = Joi.object({
  params: Joi.object({
    chatId: objectId("chatId"),
  }),
  body: Joi.object({
    users: Joi.array().items(objectId("userId")).min(1).max(50).required().messages({
      "array.base": "users must be an array of user IDs.",
      "array.min": "Please add at least {#limit} member.",
      "array.max": "You can add a maximum of {#limit} members at once.",
      "any.required": "Please provide users to add to the group.",
    }),
  }),
})
export const updateGroupUsersSchema = Joi.object({
  params: Joi.object({
    chatId: objectId("chatId"),
    userId: objectId("userId"),
  }),
})

/**
 * 💬 Fetch Messages with Cursor-Based Pagination
 * cursor and limit are optional query parameters
 */
export const fetchMessagesWithCursorSchema = Joi.object({
  params: Joi.object({
    chatId: objectId("chatId"),
  }),
  query: Joi.object({
    cursor: Joi.string().hex().length(24).optional().messages({
      "string.length": "cursor must be 24 characters long.",
      "string.hex": "cursor must be a valid hexadecimal string.",
    }),
    limit: Joi.number().integer().min(1).max(100).default(20).messages({
      "number.base": "limit must be a number.",
      "number.integer": "limit must be an integer.",
      "number.min": "limit must be at least {#limit}.",
      "number.max": "limit must not exceed {#limit}.",
    }),
  }),
})
