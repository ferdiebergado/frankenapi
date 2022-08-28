import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../http'

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new NotFoundError())
}
