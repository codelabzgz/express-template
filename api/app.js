import { loggerHttp } from '#api/config/logger.js'
import { errorHandler } from '#api/middlewares/error.js'
import { timestamp } from '#api/middlewares/timestamp.js'
import authRouter from '#api/routes/auth.js'
import healthRouter from '#api/routes/health.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import pinoHttp from 'pino-http'

const logger = pinoHttp(loggerHttp)

export const app = express()

app.set('port', process.env.PORT || 3000)
app.set('trust proxy', true)

app.use(helmet())
app.use(cors())
app.use(logger)
app.use(cookieParser(process.env.SECRET_KEY))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v1/', timestamp)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/health', healthRouter)

app.use(errorHandler)
