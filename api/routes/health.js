import { sendResponse } from '#api/lib/http.js'
import { authenticate } from '#api/middlewares/auth.js'
import { Router } from 'express'

const router = Router()

router.get('/ping', (req, res) => sendResponse(req, res))
router.get('/secured-ping', authenticate, (req, res) => sendResponse(req, res))

export default router
