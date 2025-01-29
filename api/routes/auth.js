import * as authCtrl from '#api/controllers/auth.js'
// import { TooManyRequests } from "#api/lib/http.js"
import { validateRequest } from '#api/middlewares/validator.js'
import { Router } from 'express'
// import { rateLimit } from 'express-rate-limit'
// import { slowDown } from 'express-slow-down'
import passport from 'passport'
import { z } from 'zod'

const authSchema = {
  body: z.object({
    email: z.string().email({ message: 'with invalid format' }),
    password: z.string().min(6, { message: 'must be at least 6 characters long' })
  })
}

// const limit = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 30,
//   handler: (_req, _res, next) => next(new TooManyRequests())
// })
// const speed = slowDown({
//   windowMs: 15 * 60 * 1000,
//   delayAfter: 5,
//   delayMs: (hits) => hits * 100,
//   maxDelayMs: 1 * 60 * 1000,
// })

const router = Router()

router.post('/sign-up', validateRequest(authSchema), authCtrl.signUp)
router.post('/sign-in', validateRequest(authSchema), authCtrl.signIn)
router.post('/sign-out', passport.authenticate('jwt', { session: false }), authCtrl.signOut)

export default router
