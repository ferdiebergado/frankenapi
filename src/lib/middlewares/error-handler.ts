import { Request, Response, NextFunction } from 'express'
import { ApiResponse, HttpError, ValidationError } from '../http'

export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  if (res.headersSent) next(err)

  console.error(err.stack)

  const errMsg = 'An error occurred'
  const statusCode = err.statusCode || 500

  const response: ApiResponse = {
    ok: false,
    message: err.isOperational ? err.message : errMsg,
  }

  if (err instanceof ValidationError) response.errors = err.errors

  res.status(statusCode).json(response)
}
