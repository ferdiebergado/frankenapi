import express from 'express'
import cors from 'cors'
import config from './config'
import { errorHandler, notFoundHandler, requestLogger } from './lib/middlewares'
import { router } from './routes'

const app = express()

const corsConfig = config.cors

app.set('port', config.app.port)
app.disable('x-powered-by')
app.disable('etag')

app.use(cors(corsConfig))
app.use(requestLogger)
app.use(express.json())

app.use('/', router)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
