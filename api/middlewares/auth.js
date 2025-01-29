import { Unauthorized } from '#api/lib/http.js'
import passport from 'passport'

/**
 * Middleware to authenticate users using JWT strategy.
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(new Unauthorized({ message: 'Authentication error' }))
    if (!user) return next(new Unauthorized({ message: 'Invalid or missing token' }))
    req.user = user
    next()
  })(req, res, next)
}
