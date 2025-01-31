import { BadRequest } from '#api/lib/http.js'

/**
 * Express middleware for validating HTTP requests using Zod.
 * Stops on the first validation error and passes a `BadRequest` error to the next middleware.
 *
 * @param {Object} schemas - Object containing validation schemas for different request parts.
 * @param {import("zod").ZodSchema} [schemas.body] - Zod schema for validating the request body (`req.body`).
 * @param {import("zod").ZodSchema} [schemas.params] - Zod schema for validating URL parameters (`req.params`).
 * @param {import("zod").ZodSchema} [schemas.query] - Zod schema for validating query parameters (`req.query`).
 * @param {import("zod").ZodSchema} [schemas.headers] - Zod schema for validating request headers (`req.headers`).
 * @returns {import("express").RequestHandler} Express middleware for request validation.
 */
export const validateRequest = (schemas) => (req, res, next) => {
  for (const key of ['body', 'params', 'query', 'headers']) {
    if (schemas[key] && req[key]) {
      const result = schemas[key].safeParse(req[key])
      console.log(result)
      if (!result.success) {
        const error = result.error.errors[0]
        console.log('error on validation', error.message)
        return next(new BadRequest({ message: `${error.path[0]} ${error.message.toLowerCase()}` }))
      }
    }
  }

  next()
}
