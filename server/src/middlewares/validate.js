import ErrorHandler from "./errorHandler.js";

export const validate =
  (schema, property = "body") =>
  (req, _, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((d) => d.message.replace(/["]/g, ""));
      return next(new ErrorHandler(400, errors)); // send array
    }
    req[property] = value; // sanitized body
    next();
  };

/**
 * Validate any request object properties defined in the schema
 * e.g., params, body, query, headers
 */
export const validateRequest = (schema) => (req, _, next) => {
  const requestKeys = ["params", "body", "query", "headers", "cookies"];
  const schemaKeys = Object.keys(schema.describe().keys || {});

  let errors = [];
  requestKeys.forEach((key) => {
    if (schemaKeys.includes(key)) {
      const { error, value } = schema.extract(key).validate(req[key], {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        errors = errors.concat(
          error.details.map((d) => d.message.replace(/["]/g, ""))
        );
      } else {
        req[key] = value;
      }
    }
  });

  if (errors.length > 0) return next(new ErrorHandler(400, errors));
  next();
};
