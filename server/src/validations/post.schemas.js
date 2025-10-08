import Joi from "joi"
import { objectId, paginationSchemaObject } from "./global.schemas.js"

export const paginationSchema = Joi.object({
  query: paginationSchemaObject(),
})

export const addThoughtSchema = Joi.object({
  thoughts: Joi.string().trim().min(1).max(2000).required().messages({
    "string.base": "Thoughts must be a string",
    "string.empty": "Thoughts cannot be empty",
    "string.min": "Thoughts cannot be empty",
    "string.max": "Thoughts cannot exceed 2000 characters",
    "any.required": "Thoughts are required",
  }),
})

export const addPostSchema = Joi.object({
  caption: Joi.string().trim().max(300).allow("").optional(),
  location: Joi.string().trim().max(50).allow("").optional(),
  tags: Joi.array()
    .items(
      Joi.string().trim().max(20).message({
        "string.max": "Each tag should not exceed {#limit} characters",
      }),
    )
    .max(50)
    .optional()
    .messages({
      "array.max": "You can add up to {#limit} tags",
    }),
})

export const updatePostSchema = Joi.object({
  params: Joi.object({
    postId: objectId("postId"),
  }),
  body: Joi.object({
    caption: Joi.string().trim().max(300).allow("").optional(),
    location: Joi.string().trim().max(50).allow("").optional(),
    tags: Joi.array()
      .items(
        Joi.string().trim().max(20).message({
          "string.max": "Each tag should not exceed {#limit} characters",
        }),
      )
      .max(50)
      .optional()
      .messages({
        "array.max": "You can add up to {#limit} tags",
      }),
  }),
})

export const commnetPostSchema = Joi.object({
  params: Joi.object({
    postId: objectId("postId"),
  }),
  body: Joi.object({
    comment: Joi.string().trim().min(1).max(500).required().messages({
      "string.base": "Comment must be a text",
      "string.empty": "Comment cannot be empty",
      "string.min": "Comment should have at least {#limit} characters",
      "string.max": "Comment should not exceed {#limit} characters",
      "any.required": "Comment is required",
    }),
    parentId: objectId("parentId").optional().allow(null),
  }),
})

export const postIdSchema = Joi.object({
  params: Joi.object({
    postId: objectId("postId"),
  }),
})

export const deleteCommentSchema = Joi.object({
  params: Joi.object({
    postId: objectId("postId"),
    commentId: objectId("commentId"),
  }),
})
