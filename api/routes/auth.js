import * as authCtrl from '#api/controllers/auth.js'
import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/sign-up', authCtrl.signUp)
router.post('/sign-in', authCtrl.signIn)
router.post('/sign-out', passport.authenticate('jwt', { session: false }), authCtrl.signOut)

export default router
