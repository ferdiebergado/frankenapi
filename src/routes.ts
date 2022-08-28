import { Request, Response, NextFunction, Router } from 'express'
import { userRouter } from './resources/user'
import { query } from './lib/db'

export const router = Router()

const rootHandler = (_req: Request, res: Response) => {
  res.json({ status: 'up' })
}

const healthCheck = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sqlSelect1 = {
      name: 'healthcheck',
      text: 'SELECT 1',
    }

    await query(sqlSelect1)

    res.json({
      status: 'ok',
    })
  } catch (error) {
    next(error)
  }
}

router.get('/', rootHandler)
router.get('/health', healthCheck)
router.use('/users', userRouter)
