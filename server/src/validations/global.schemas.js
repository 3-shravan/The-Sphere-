import Joi from "joi"

export const objectId = (fieldName = "id") =>
  Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": `${fieldName} is required.`,
      "string.length": `${fieldName} must be 24 characters long.`,
      "string.hex": `${fieldName} must be a valid hexadecimal string.`,
    })

export const idParam = Joi.object({
  params: Joi.object({
    id: objectId("ID"),
  }),
})

export const querySearch = Joi.object({
  query: Joi.object({
    search: Joi.string().trim().max(100).optional().allow("", null).messages({
      "string.max": "Search query cannot be more than 100 characters.",
    }),
  }),
})

export const paginationSchemaObject = () =>
  Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page must be a number",
      "number.integer": "Page must be an integer",
      "number.min": "Page must be at least {#limit}",
    }),
    limit: Joi.number().integer().min(1).max(1000).messages({
      "number.base": "Limit must be a number",
      "number.integer": "Limit must be an integer",
      "number.min": "Limit must be at least {#limit}",
      "number.max": "Limit must be at most {#limit}",
    }),
  })
