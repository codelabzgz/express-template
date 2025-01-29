import * as authCtrl from '#api/controllers/auth.js'
import { validateRequest } from '#api/middlewares/validator.js'
import { Router } from 'express'
import passport from 'passport'
import { z } from 'zod'

const authSchema = {
  body: z.object({
    email: z.string().email({ message: 'with invalid format' }),
    password: z.string().min(6, { message: 'must be at least 6 characters long' })
  })
}

const router = Router()

router.post('/sign-up', validateRequest(authSchema), authCtrl.signUp)
router.post('/sign-in', validateRequest(authSchema), authCtrl.signIn)
router.post('/sign-out', passport.authenticate('jwt', { session: false }), authCtrl.signOut)

export default router
