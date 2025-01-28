import * as healthCtrl from '#api/controllers/health.js'
import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/ping', healthCtrl.ping)
router.get('/secured-ping', passport.authenticate('jwt', { session: false }), healthCtrl.ping)

export default router
