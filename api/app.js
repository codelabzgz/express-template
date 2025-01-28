import { loggerHttp } from '#api/config/logger.js'
import healthRouter from '#api/routes/health.js'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import pinoHttp from 'pino-http'

const logger = pinoHttp(loggerHttp)

export const app = express()

app.set('port', process.env.PORT || 3000)
app.set('trust proxy', true)

// Middlewares generales
app.use(helmet())
app.use(cors())
app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const apiRouter = express.Router()
apiRouter.use('/health', healthRouter)

app.use('/api/v1', apiRouter)
