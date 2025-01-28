import { currentSession } from '#api/middlewares/auth.js'
import healthRouter from '#api/routes/health.js'
import cors from 'cors'
import express from 'express'
import logger from 'morgan'

export const app = express()

app.set('port', process.env.PORT || 3000)
app.set('trust proxy', true)

app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(currentSession)

app.use()

app.use('/health', healthRouter)
