import * as healthCtrl from '#api/controllers/health.js'
import { Router } from 'express'

const router = Router()

router.get('/ping', healthCtrl.ping)

export default router
